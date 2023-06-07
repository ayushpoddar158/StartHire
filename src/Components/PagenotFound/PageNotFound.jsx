import React from 'react'
import Home from '../Home';
import './PageNotFound.css';
import pagenotfounfimg1 from '../../assets/404img1.webp';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
<div className="main404">

  <div className="innerright404">
  <h1 className='e404h1'>404 Error</h1>
    <h1>That page dosent exist!</h1>
    <p>Sorry the page you are looking for could not be fouund.</p>
  </div>
  <div className="buttonsection">
    <button><Link className='page404Link' to='/Home'>Home page</Link></button>
  </div>
</div>
  )
}

export default PageNotFound