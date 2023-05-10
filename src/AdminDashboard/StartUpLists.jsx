import React, { useState } from "react";
import "./css/StartUpLists.css";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import Card from '../Components/Card/Card'
import {TextField} from "@mui/material";



const StartUpLists = () => {

// usesates  
const [inpdata,setInpdata]=useState("")

const getdata=(e)=>{
setInpdata(e.target.value)
console.log(inpdata)
}


  return (
    <>
     <div className="mainCardDiv">
    <div className="search">
    <TextField
          id="outlined-read-only-input"
          label="Search"
          defaultValue="Hello World"
          onChange={getdata}
          value={inpdata}
         
        />
    </div>
    <Card  />
  

     </div>
    </>
  );
};

export default StartUpLists;
