import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import { useState } from 'react';
import './css/AdminNotification.css'


const AdminNotification = () => {


    const [notiselect, setnotiselect] = useState('');
    const [notietextarea, setnotitextarea] = useState('');

    const handleChange = (event) => {
      setnotiselect(event.target.value);
    };
    const handleTextArea=(e)=>{
setnotitextarea(e.target.value)
    }
  return (
 <>
    <div className="notimainDiv">
 <FormControl>
        <div className="notidivinner1">
        <h2 className='notiHeader'>Send Notification</h2>
        <Box className="Notibox" sx={{ }}>
      <FormControl className='notiFormControl' >
        <InputLabel id="demo-simple-select-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={notiselect}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>All Students</MenuItem>
          <MenuItem value={20}>All Startups</MenuItem>
          <MenuItem value={30}>Custom
       
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
        </div>
        <div className="notiinner2">
         <textarea name="" id="notiTextArea"  cols="70" rows="5" value={notietextarea} onChange={handleTextArea} placeholder='Write Content here'></textarea>
        </div>
        <div className="notibutton">
            <Button id='notibtn'  style={{width:"50%"}} variant="contained">Send</Button>
        </div>
    </FormControl>
    </div>
 </>
  )
}

export default AdminNotification