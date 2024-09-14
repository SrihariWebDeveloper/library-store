import React from 'react'
import './Store.css'
import PlayStore from '../../assets/Forntend/play_store.png'
import AppStore from '../../assets/Forntend/app_store.png'

const Store = () => {
  return (
    <div className='store'>
      <div className="play">
        <h2>For More Better Experence <br />Download App</h2>
        <div className="image-play">
          <img src={PlayStore} alt="" />
          <img src={AppStore} alt="" />
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Store
