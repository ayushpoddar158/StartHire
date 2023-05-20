import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/Home.css'
import poster1 from '../assets/posterimg1.jpg'
const Home = () => {

  return (
    <>
    <>
      <div className="mainConatainerHome">
        <div className="poster1" style={{backgroundImage:`url(${poster1})`}}>
        </div>
        <div className="homediv2">
          <h1>
            About StartHire
          </h1>
        <div className="horizontalhr">
         
        </div>
          <div className="homediv2about1">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis optio magni maxime dicta. Perferendis est maiores quam commodi ipsam! Temporibus perferendis cupiditate molestiae assumenda eveniet explicabo possimus modi quod odio.</p>
          </div>
        </div>
      </div>
    </>



    </>

  )
}

export default Home