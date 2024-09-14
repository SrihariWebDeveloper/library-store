import React, { useState } from 'react'
import '../Homiee/Homiee.css'

//componets
import Home from '../../components/Home/Home.js'
import Writers from '../../components/Writers/Writer.js'
import Books from '../../components/Books/Books.js'
import AppStore from '../../components/Store/Store.js'
import NavBar from '../../components/NavBar/NavBar.js'
import Footer from '../../components/Footer/Footer.js'
import Login from '../../components/Login/login.js'
//show iteams
import ShowBook from '../../components/showIteam/Show.js'





const Homiee = ({ Savedata, SetSaveData }) => {

  const [category, setCategory] = useState("All")
  const [showLogin, setShowLogin] = useState(false)

  const [show, setShow] = useState(true)

  const [book,setBook] = useState([])

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="comp-list">
        <NavBar setShowLogin={setShowLogin} Savedata={Savedata} />
        {show
          ? <div className="comp">
            <Home />
            <Writers category={category} setCategory={setCategory} />
            <Books setBook={setBook} setShow={setShow} category={category}/>
            <AppStore />
          </div>
          : <ShowBook book={book} setShow={setShow} SetSaveData={SetSaveData} />
        }
        <Footer />
      </div>
    </>
  )
}

export default Homiee
