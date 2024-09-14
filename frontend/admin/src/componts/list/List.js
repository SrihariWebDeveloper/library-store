import React,{useState,useEffect} from 'react'
import '../list/List.css'
import axios from 'axios'
import { toast } from 'react-toastify';

const List = ({url}) => {
  const [list,setList] = useState([])
   
  const fetchData = async() =>{
    const responce = await axios.get(`${url}/books`)
    
    console.log(responce.data)
    if(responce.data.success){
      setList(responce.data.Data)
    }else{
      toast.error("error occured")
    }
  }
  const deletData = async(id)=>{
    const responce = await axios.delete(`${url}/remove/${id}`)
    await fetchData();
    if(responce.data.success){
      toast.success(responce.data.message)
    }else{
      toast.error(responce.data.message)
    }
  }
  
  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className='list'>
      <p>All the Books:</p>
      <div className="table-list">
        <div className="table-list-head">
          <b>Image</b>
          <b>Name</b>
          <b>Author</b>
          <b>Year</b>
          <b>Action</b>
        </div>
        {list.map((iteam,index)=>{
          return (
            <div className='list-data' key={index}>
              <div className="iamge">
                <img src={`${url}images/${iteam.image}`} alt={iteam.name} />
              </div>
              <div className="list-info">
                <h4>{iteam.name}</h4>
              </div>
              <div className="list-array">
                <p>{iteam.author},</p>
              </div>
              <div className="list-category">
                <h4>{iteam.year}</h4>
              </div>
              <div className="list-action">
                <h4 onClick={()=>deletData(iteam._id)}>X</h4>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
