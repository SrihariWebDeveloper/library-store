from flask import Flask,jsonify,request,send_from_directory
from flask_cors import CORS
from bson import ObjectId
from pymongo import MongoClient
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import JWTManager,create_access_token
import base64
import os


from dotenv import load_dotenv
# Load environment variables from .env file
load_dotenv()

conn_string = os.getenv("MONGOODB_URL")


app = Flask(__name__)
CORS(app)

#secret key
app.secret_key = 'your_secret_key'

#connecting db
client = MongoClient()
client = MongoClient(conn_string)
myDb = client["bookStore"]
myUser = myDb["Users"]
Books = myDb['Books']
Writers = myDb['Writers']

jwt = JWTManager(app)

#creating an image store system
app.config["UPLOADS_FOLDERS"] = 'backend/uploads'
allowed_ext = {'png','jpg','jpeg','gif'}

#load images
@app.route('/images/<filename>')
def getImage(filename):
    return send_from_directory(
        app.config["UPLOADS_FOLDERS"],
        filename,
        as_attachment=True
    )

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in allowed_ext

#signup routes
@app.route('/signup', methods=['POST'])
def signup():
    _name = request.json['name']
    _email = request.json['email']
    _password = request.json['password']
    
    if _name and _password and _email and request.method == 'POST':
        #checking
        user = myDb.Users.find_one({'email':_email})
        if user:
            return jsonify({"sucess":False,"message":"User alredy exists"})
        HasedPassword = generate_password_hash(_password)
        myDb.Users.insert_one({'name':_name,'email':_email,'password':HasedPassword,'books':[]})
        token = create_access_token(identity=_email)
        return jsonify({"sucess":True,"message":"Sucessfully signIn","token":token}),200
    
#login routes
@app.route('/login',methods=['POST'])
def login():
    _email = request.json['email']
    _password = request.json['password']
    
    user = myDb.Users.find_one({'email':_email})
    
    if not user or not check_password_hash(user['password'],_password):
        return jsonify({"message":"Invalid username or password"})
    else:
        token = create_access_token(identity=_email)
        return jsonify({"sucess":True,"token":token,"message":"Sucessfuly logdIn"}), 200



#add iteams
@app.route('/add',methods=['POST'])
def add():
    name = request.form['name']
    author = request.form['author']
    year = request.form['year']
    summery = request.form['summery']
    image = request.files['image']
    
    filename = secure_filename(image.filename)
    image.save(os.path.join(app.config["UPLOADS_FOLDERS"],filename))
    book = {'name':name,'author':author,'year':year,'summery':summery,'image':filename}
    
    myDb.Books.insert_one(book)
    return jsonify({"success":True,"message":"book added sucessfuly"})



#add writers
@app.route('/addwriters',methods=['POST'])
def addWriters():
    name = request.form['name']
    image = request.files['image']
    image_filename = secure_filename(image.filename)
    image.save(os.path.join(app.config["UPLOADS_FOLDERS"],image_filename))
    
    writer = {'name':name,'image':image_filename}
    
    myDb.Writers.insert_one(writer)
    return jsonify({"success":True,"message":"Writer added sucessfuly"})



#list of books
@app.route('/books', methods=['GET'])
def books():
    books_list = []
    for book in Books.find():
        books_list.append({
            '_id':str(book["_id"]),
            'name':book['name'],
            'author':book['author'],
            'year':book['year'],
            'summery':book['summery'],
            'image':book['image']
        })
    return jsonify({"success":True,"Data":books_list})


#writers list
@app.route('/writers', methods=['GET'])
def writers():
    books_list = []
    for book in Writers.find():
        books_list.append({
            '_id':str(book['_id']),
            'name':book['name'],
            'image':book['image']
        })
    return jsonify({"success":True,"Data":books_list})


#remove book
@app.route('/remove/<bookid>',methods=['DELETE'])
def remove(bookid):
    myDb.Books.delete_one({'_id':ObjectId(bookid)})
    return jsonify({"success":True,"message":"book removed sucessfully"})

@app.route('/removeWrite/<bookid>',methods=['DELETE'])
def removeWriter(bookid):
    myDb.Writers.delete_one({'_id':ObjectId(bookid)})
    return jsonify({"success":True,"message":"book removed sucessfully"})


#saved books to user card
@app.route('/save',methods=['POST'])
def save():
    user_id = request.json["_id"]
    book_id = request.json["book_id"]
    
    myDb.Users.update_one(
        {'_id':ObjectId(user_id)},
        {'$push':{'books':book_id}}
    )
    
    return jsonify({"success":True,"message":"book saved successfuly"})

#unsave books from user card
@app.route('/unsave',methods=['POST'])
def unsave():
    user_id = request.json["_id"]
    
    myDb.Users.update_one(
        {'_id':ObjectId(user_id)},
        {'$pop':{'books':-1}}
    )
    
    return jsonify({"success":True,"message":"unsaved book successfuly"})


@app.route('/', methods=['GET'])
def main():
    return "hello"


if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)