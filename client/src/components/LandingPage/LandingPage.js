import React from 'react'
import './LandingPage.css'
import video from '../../assets/background.mp4'
import Buttom from '../Buttom/Buttom'

const LandingPage = () => {
  return (
    <div className='cover-container' >
      <video className='video-container' src={video} autoPlay loop muted />
      <h1>TRAVEL SOUL</h1>
      <h3>Tu actividad a un click</h3>
      <Buttom
        nameClass='button-home'
        description='DESCUBRI'
        linkTo='/home'
      />

      <Buttom
        nameClass='button-aboutMe'
        description='About..'
        linkTo='/aboutMe'
      />

    </div>
  )
}

export default LandingPage
