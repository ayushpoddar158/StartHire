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
         
       
          <div className="homediv2about1">
            <p>"Welcome to a ground-breaking platform meticulously crafted to revolutionize the way dedicated students and dynamic startups connect!"</p>
          </div>
        </div>
      </div>
    </>



    </>

  )
}

export default Home