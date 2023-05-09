
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './css/AdminStudentList.css'
const AdminStudentLists = () => {


  return (
<>
<div className='maindiv1'>
<h2>Check Student Status</h2>
<div className="box2">
<FormControl>
    
    <RadioGroup
      row
      aria-labelledby="demo-row-radio-buttons-group-label"
      name="row-radio-buttons-group"
    >
      <FormControlLabel value="female" control={<Radio />} label="Available" />
      <FormControlLabel value="male" control={<Radio />} label="Verified" />
      <FormControlLabel value="other" control={<Radio />} label="Rejected" />
     
    </RadioGroup>
  </FormControl>
</div>

<div className="box3">
  
</div>
  
</div>
</>
  

  )
}

export default AdminStudentLists