import React from "react";
import { Button } from "@mui/material";
import './card.css'
import { Link } from "react-router-dom";
import StartUpDetailModel from "../Model/StartUpDetailModel";
const Card = (props) => {
  var data = props.data;
  console.log("DATA",data);
  return (
    <>

      <div className="container-fluid Admincardmain">
        <div className="gradient-cards ">
          <div className="cardi">
            <div className="container-card bg-green-box">
              <div className="cardh3" ><span className="cardh3span1" >{data?.jobs.length}</span> <span className="cardh3span2">: Jobs</span></div>
              <p className="card-title">{data?.name}</p>
              <Link to={`/AdminStartupData/${data?.uid}`}>
                <Button variant="contained" className="cardbtnadmin" >Jobs</Button>
             
              </Link>
              <StartUpDetailModel  />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Card;
