import React from 'react'
import '../sidebar/Sidebar.css'
import List from '../../assests/order_icon.png'
import Add from '../../assests/add_icon.png'
import { NavLink } from 'react-router-dom'
import Writer from '../../assests/writer.png'

const Sidebar = () => {
  return (
    <div className='side-bar'>
      <div className="side-bar-list">
        <NavLink to={'/add'} className="list-one">
          <img src={Add} alt="" />
          <p>Add Iteams</p>
        </NavLink>
        <NavLink to={'/writers'} className="list-one">
          <img src={Writer} alt="" className='write' />
          <p>Writer</p>
        </NavLink>
        <NavLink to={'/list'} className="list-one">
          <img src={List} alt="" />
          <p>Books List</p>
        </NavLink>
        <NavLink to={'/writerslist'} className="list-one">
          <img src={List} alt="" />
          <p>Writer's List</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
