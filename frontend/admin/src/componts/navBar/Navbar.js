import React from 'react'
import '../navBar/Navbar.css'
import Logo from '../../assests/Logo.png'
import User from '../../assests/user.png'


const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="nav-left">
        <img src={Logo} alt="" />
      </div>
      <div className="nav-right">
        <img src={User} alt="" />
      </div>
    </div>
  )
}

export default Navbar
