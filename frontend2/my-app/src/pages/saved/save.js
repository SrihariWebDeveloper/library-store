import React from 'react'
import NavBar from '../../components/NavBar/NavBar.js'
import Footer from '../../components/Footer/Footer.js'
import AddSave from '../../components/addSave/AddSave.js'

const Save = () => {
  return (
    <div className='saved'>
      <NavBar/>
      <div className="main-saved">
        <AddSave/>
      </div>
      <Footer/>
    </div>
  )
}

export default Save
