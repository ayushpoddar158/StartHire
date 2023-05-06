import React from 'react'
import { Button } from '@material-ui/core'
import { TextField } from '@mui/material'
import './css/JobDescp.css'

const JobDescp = () => {
    return(
        <>
        
            <div className="container main">
                <div className="title onediv">
                <h2 id='heading1'>Web Dev</h2>
                <hr />

                </div>
                <div className="description onediv">
                <h2>Job Description</h2>
                <hr />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat qui quis quae facilis necessitatibus. Atque odit, est dolores nulla reiciendis id veritatis iusto modi vel doloremque similique animi nam vitae.</p>
                </div>
                <div className="skills"></div>
                <h2>Skills Required</h2>
                <hr />
                <div className="tags">
                <Button className='Skillreq' variant="contained">C</Button>
                <Button className='Skillreq' variant="contained">Java</Button>
                <Button className='Skillreq' variant="contained">Web deb</Button>
               

                </div>
                {/* <hr /> */}
               <div className="suggestStudent">
               <Button variant="contained">Suggest Interns</Button>
               </div>
                <div className="studentList">

                </div>
            </div>
        </>
    )
}

export default JobDescp

{/* style={{backgroundcolor:" #f37a27"}} */}