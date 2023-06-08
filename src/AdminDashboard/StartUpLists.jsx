import React, { useState } from "react";
import "./css/StartUpLists.css";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import Card from '../Components/Card/Card'
import { TextField } from "@mui/material";
import { useEffect } from "react";

import StartUpDetailModel from "../Components/Model/StartUpDetailModel";

const StartUpLists = (props) => {

  var startUpRefs = props.allData.startup;
  // usestates
  const [inpdata, setInpdata] = useState("")
  const [container, setContainer] = useState([])

  const getdata = (e) => {
    setInpdata(e.target.value)
    console.log("inpData", inpdata)
  }

  useEffect(() => {
    setContainer(startUpRefs)
  }, [startUpRefs])

  useEffect(() => {
    if (inpdata === "") {
      setContainer(startUpRefs);
    }
    else{
      var filter = startUpRefs.filter((item) => {
        return item.data().name.toLowerCase().includes(inpdata.toLowerCase())
      })
      setContainer(filter)
    }
  }, [inpdata])



  return (
    <>
      <div className="mainCardDiv">
        <div className="search">
          <TextField
          className="StartUpsearch"
            id="outlined-read-only-input"
            label="Search"
            defaultValue="Hello World"
            onChange={getdata}
            value={inpdata}
          />
        </div>
        <div className="Admincards">
      
        {container?.map((item) => {
          console.log("container", item.data());
          return <Card data={item.data()} />
        })}
            
        </div>
      </div>
    </>
  );
};

export default StartUpLists;
