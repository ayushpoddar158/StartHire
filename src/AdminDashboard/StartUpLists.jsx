import React from 'react'
import './css/StartUpLists.css'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
const StartUpLists = () => {
  return (
  <>
    <div className="mainLists">
<div className="box2">
    <NavLink className="navLinkStartUp"  >StartHire</NavLink>
    <div className='noOfJobmaindiv'>
    <h5>No of Jobs</h5>
    <h4 className='noOfJobs'>
        20
    </h4>
    </div>
    <Button variant="contained" >View</Button>
</div>

    </div>
  </>
  )
}

export default StartUpLists