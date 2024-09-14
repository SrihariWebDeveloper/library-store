import React, { useState } from 'react'
import { toast } from 'react-toastify'
import '../add/Add.css'
import axios from 'axios'
import AddImages from '../../assests/upload_area.png'

const Add = ({ url }) => {
  const [image, setImage] = useState(false)

  const datas = {
    name: '',
    author: '',
    year: '',
    summery: ''
  }

  const [data, setData] = useState(datas)

  const onchangeHandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onSubmitForm = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('author', data.author);
    formData.append('year', data.year);
    formData.append('summery', data.summery);
    formData.append('image', image)

    const respone = await axios.post(`${url}/add`, formData)

    if (respone.data.success){
      toast.success(respone.data.message)
      setData({
        name: "",
        author: "",
        year: "",
        summery: ""
      })
      setImage(false)
    }
    else{
      toast.error(respone.data.message)
    }
  }
  return (
    <div className='add-items'>
      <form onSubmit={onSubmitForm}>
        <div className="add-list">
          <h3>Add Books:-</h3>
          <div className="image-pic">
            <label htmlFor="image">
              <img src={image ? URL.createObjectURL(image) : AddImages} alt="" required />
              <input type="file" id='image' hidden onChange={(e) => setImage(e.target.files[0])} />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="name">Book Name:</label>
            <input type="text" name="name" placeholder='Name of book' className='form-control' autoComplete='off' required onChange={onchangeHandle} />
          </div>
          <div className="mb-3">
            <label htmlFor="author">Author:</label>
            <input type="text" className='form-control' name="author" id="" onChange={onchangeHandle} placeholder='name of the author' />
          </div>
          <div className="mb-3">
            <label htmlFor="year">Year:</label>
            <input type="text" name="year" id="" className='form-control' placeholder='Year' required onChange={onchangeHandle} />
          </div>
          <label htmlFor="summery">Summery:</label>
          <div className="mb-3">
            <textarea className="form-control" placeholder="Summery of the book" id="" name='summery' onChange={onchangeHandle}></textarea>
          </div>
          <div className="submit-btn">
            <button type="submit" className='btn btn-primary'>Add Book</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Add
