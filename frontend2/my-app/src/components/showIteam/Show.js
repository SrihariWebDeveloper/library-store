import React from 'react'
import './../showIteam/Show.css'
import UnSave from '../../assets/Forntend/Unsave.png'

const Show = ({ book,setShow }) => {

  return (
    <div className='show'>
      <div className='book-data'>
        <h2>{book.name}</h2>
        <div className="main">
          <img src={book.image} alt={book.name} />
          <div className="info">
            <h4>{book.author}</h4>
            <h6>{book.year}</h6>
            <p>{book.summery}</p>
          </div>
        </div>
        <div className="tools">
          <img src={UnSave} alt=""/>
          <button type="click" onClick={()=>setShow(true)}>Back</button>
        </div>
      </div>
    </div>
  )
}

export default Show
