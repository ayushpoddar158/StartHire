 import React from 'react'
 import { Link } from 'react-router-dom'

 const Navbar = () => {
   return (
     <>

<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to="#">StartHire</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse pr-4" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto pr-5">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/About">About Us</Link>
      </li>
      
      
   
      <li className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Login
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/Login">Student Login</Link>
          <Link className="dropdown-item" to="/LoginStartUp">StartUp Login</Link>
         
        </div>
      </li>


      <li className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Register
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/Signup">Student Register</Link>
          <Link className="dropdown-item" to="/signupstartup">StartUp Register</Link>
         
        </div>
      </li>
     
      <li className="nav-item">
        <Link className="nav-link" to="/Contact">Contact Us</Link>
      </li>
      
    </ul>
   
  </div>
</nav>
     </>
   )
 }
 
 export default Navbar