import React, { useContext, useEffect, useState } from 'react'
import './Writer.css'
import { StoreContext } from '../Context.js'
import axios from 'axios'


const Writer = ({ category, setCategory }) => {
  const [data,setData] = useState([])

  const { url } = useContext(StoreContext)

  const getWriters = async () => {

    const response = await axios.get(`${url}/writers`)

    if (response.data.success) {
      setData(response.data.Data)
    } else {
      console.log("error occured")
    }
  }

  useEffect(()=>{
    getWriters()
  },[])

  return (
    <div className='writer'>
      <div className="writer-text">
        <h1>Famous Writer's</h1>
      </div>
      <div className="writers-list">
        {data.map((iteam, index) => {
          return (
            <div className="list-data" key={index}>
              <div className="data-container" onClick={() => setCategory(prev => prev === iteam.name ? "All" : iteam.name)}>
                <img src={iteam.image} className={category === iteam.name ? "active" : ""} alt="" />
                <h4>{iteam.name}</h4>
              </div>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default Writer
