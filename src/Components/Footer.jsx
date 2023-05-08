import React from 'react'
import { Link } from 'react-router-dom'
import { FaPhone } from 'react-icons/fa';
const Footer = () => {
  return (
  <>

{/* <!-- FOOTER START --> */}
<div className="footer">
  <div className="contain footermain">
  <div className="col">
    <h1>Page</h1>
    <ul>
      <li><Link to={'/'}>Home</Link></li>
      <li><Link to={'/About'}>About</Link></li>
      <li><Link to={'/Contact'}>Contact Us</Link></li>
    
     
    </ul>
  </div>
  <div className="col">
    <h1>UseFull Links</h1>
    <ul>
    <li><Link to={'https://www.aicnalanda.com/'} target='_blank'>Aic Nalanda</Link></li>
    </ul>
  </div>
 
  <div className="col">
    <h1>Get In Touch</h1>
    <ul>
      <li>
      AIC-Nalanda Institute Of Technology Foundation,
Buddhist Villa, Chandaka
Bhubaneswar, Odisha-754005
      </li>
      <li><span>@</span> +91-8249585065</li>
      <li><span>Eml:</span><Link mailto={"incmgr@aicnalanda.com"} >incmgr@aicnalanda.com</Link></li>
    </ul>
  </div>
  <div className="col">
    <h1>Our Location</h1>
    <ul>
      <li>Contact us</li>
      <li>Web chat</li>
      <li>Open ticket</li>
    </ul>
  </div>
  {/* <div className="col social">
    <h1>Social</h1>
    <ul>
      <li><img src="https://svgshare.com/i/5fq.svg" width="32" style="width: 32px;"/></li>
      <li><img src="https://svgshare.com/i/5eA.svg" width="32" style="width: 32px;"/></li>
      <li><img src="https://svgshare.com/i/5f_.svg" width="32" style="width: 32px;"/></li>
    </ul>
  </div> */}
<div className="clearfix"></div>
</div>
</div>
{/* <!-- END OF FOOTER --> */}

  </>
  )
}

export default Footer