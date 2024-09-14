import React, { useContext, useEffect, useState } from 'react'
import './Books.css'
import { StoreContext } from '../Context.js'
import axios from 'axios'


const Books = ({ category,SetSaveData,Savedata,setShow,setBook }) => {
  const [data,setData] = useState([])
  const { url } = useContext(StoreContext)

  const getBooks = async () => {

    const response = await axios.get(`${url}/books`)

    if (response.data.success) {
      setData(response.data.Data)
    } else {
      console.log("error occured")
    }
  }

  useEffect(()=>{
    getBooks()
  },[])

  
  return (
    <div className='books'>
      <h2>Books</h2>
      <div className='list-books'>
        {data.map((iteam, index) => {
          if (category === "All" || category === iteam.author) {
            return (
              <div key={index}>
                <div className='bookData'>
                  <div className="iteams" onClick={()=>setShow(false)}>
                    <img src={iteam.image} alt="" onClick={()=>setBook({
                      "image":iteam.image,
                      "name":iteam.name,
                      "author":iteam.author,
                      "year":iteam.year,
                      "summery":iteam.summery
                    })}/>
                    <p>{iteam.name}</p>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>
      <hr />
    </div>
  )
}

export default Books
