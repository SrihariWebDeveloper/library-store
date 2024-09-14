import React from 'react'
import './Footer.css'
import Logo from '../../assets/Forntend/Logo.png'
import FaceBook from '../../assets/Forntend/facebook_icon.png'
import LinkedIn from '../../assets/Forntend/linkedin_icon.png'
import Twitter from '../../assets/Forntend/twitter_icon.png'

const Footer = () => {
  return (
    <div className="footer-main">
      <div className='footer'>
        <div className="footer-left">
          <img src={Logo} alt="" />
          <h4>+19 99XXXXXXX1</h4>
          <p>Developer@gmail.com</p>
          <div className="social">
            <img src={FaceBook} alt="" />
            <img src={LinkedIn} alt="" />
            <img src={Twitter} alt="" />
          </div>
        </div>
        <div className="footer-center">
          <ul>
            <li>Home</li>
            <li>Service's</li>
            <li>Privacy</li>
            <li>Security</li>
          </ul>
        </div>
        <div className="footer-right">
          <ul>
            <li>Subscribe:-</li>
            <li>
              <input type="email" name="" id="" placeholder='enter your email..' />
              <button type="submit">Subscribe</button>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="copy-right">
        <span>copyright 2024 all rights reserved</span>
      </div>
    </div>
  )
}

export default Footer
