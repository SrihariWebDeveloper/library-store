import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import '../addWriters/addWriters.css'
import AddImages from '../../assests/upload_area.png'

const AddW = ({url}) => {
    const [image, setImage] = useState(false)

  const datas = {
    name: ''
  }

  const [data, setData] = useState(datas)

  const onchangeHandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }
  useEffect(()=>{
    console.log(data);
    
  },[data])
  const onSubmitForm = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', image)

    const respone = await axios.post(`${url}/addwriters`, formData)

    if (respone.data.success) {
      setData({
        name: ""
      })
      setImage(false)
      toast.success(respone.data.message)
    }
    else {
      toast.error(respone.data.message)
    }
  }
  return (
    <div className='add-writers'>
      <form onSubmit={onSubmitForm}>
        <div className="main-writer">
         <h3>Add new Writer's:-</h3>
          <div className="image-pic">
            <label htmlFor="image">
              <img src={image ? URL.createObjectURL(image) : AddImages} alt="" required />
              <input type="file" id='image' hidden onChange={(e) => setImage(e.target.files[0])} />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="name">Writer Name:</label>
            <input type="text" name="name" placeholder='Name of writer..' className='form-control' autoComplete='off' required onChange={onchangeHandle} />
          </div>
          <div className="submit-btn">
            <button type="submit" className='btn btn-primary'>Add Book</button>
          </div>
        </div>
        </form>
    </div>
  )
}

export default AddW
