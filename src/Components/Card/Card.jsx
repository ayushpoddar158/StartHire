import React from "react";
import { Button } from "@mui/material";
import './card.css'

const Card = (props) => {
  return (
    <>
   
      <div className="container">
        <div className="gradient-cards">
          <div className="card">
            <div className="container-card bg-green-box">
           <div className="cardh3" ><span className="cardh3span1" >20</span> <span className="cardh3span2">Jobs</span></div>
              <p className="card-title">Inxt</p>
            <Button variant="contained" >View</Button>
            </div>
          </div>
          <div className="card">
            <div className="container-card bg-green-box">
           <div className="cardh3" ><span className="cardh3span1" >20</span> <span className="cardh3span2">Jobs</span></div>
              <p className="card-title">Inxt</p>
            <Button variant="contained" >View</Button>
            </div>
          </div>
          <div className="card">
            <div className="container-card bg-green-box">
           <div className="cardh3" ><span className="cardh3span1" >20</span> <span className="cardh3span2">Jobs</span></div>
              <p className="card-title">Inxt</p>
            <Button variant="contained" >View</Button>
            </div>
          </div>
       
        </div>
      </div>

    </>
  );
};

export default Card;
