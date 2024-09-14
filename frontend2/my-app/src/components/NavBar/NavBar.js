import React, { useContext, useState, } from 'react'
import './NavBar.css'
import Logo from '../../assets/Forntend/Logo.png'
import Search from '../../assets/Forntend/search_icon.png'
import Saved from '../../assets/Forntend/Save.png'
import MeanuBar from '../../assets/Forntend/menu-bars-icon.jpg'
import Cross from '../../assets/Forntend/cross.jpg'
import Profile from '../../assets/Forntend/User.png'
import { StoreContext } from '../Context'
import { Link } from 'react-router-dom'

const NavBar = ({ setShowLogin, Savedata }) => {
  const [active, setActive] = useState("home")
  const [meanu, setMeanu] = useState(true)
  const { token, setToken } = useContext(StoreContext)
  const removeToken = () => {
    localStorage.removeItem("token");
    setToken("");

  }
  const eventChange = () => {
    if (meanu) {
      setMeanu(false)
    } else {
      setMeanu(true)
    }
  }
  return (
    <div className={meanu === true ? "navbar" : "navbar show"}>
      <div className="nav-left">
        <img src={Logo} alt="" />
      </div>
      <div className="nav-center">
        <input type="text" name="" id="" placeholder='Search' />
        <img src={Search} alt="" />
      </div>
      <div className="resp">
        <div className="list-meanu">
          <ul>
            <div className="imges-bar">
              <li onClick={eventChange}>{meanu ? <img src={MeanuBar} alt="" /> : <img src={Cross} alt="" />}</li>
            </div>
            <li onClick={() => setActive("home")} className={active === "home" ? "active" : ""}>Home</li>
            <li onClick={() => setActive("writer")} className={active === "writer" ? "active" : ""}>Writers</li>
            <li onClick={() => setActive("books")} className={active === "books" ? "active" : ""}>Books</li>
            <li onClick={() => setActive("app")} className={active === "app" ? "active" : ""}>AppStore</li>
          </ul>
        </div>
        <div className="nav-right">
          {!token
            ? <button type="submit" onClick={() => setShowLogin(true)}>Login</button>
            :<>
            <Link to={'/save'}>
              <img src={Saved} alt="" />
              <p className={meanu === true ? "count" : "count show"}>{Savedata}</p>
            </Link>
            <div className='user-login'>
              <img src={Profile} alt="" className='profile' />
              <div className="list">
                <button onClick={removeToken}>LogOut</button>
              </div>
            </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default NavBar
