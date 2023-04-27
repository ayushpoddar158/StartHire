import React from "react";
import "../style/Dashboard/SearchInterns.css";
import Aside from '../DashboardArea/Aside'
const SearchInterns = () => {
  return (
    <>
      <div>
        <div class="container-fluid" id="main">
          <div class="row row-offcanvas row-offcanvas-left">
            <Aside />
            {/* <Dashboard/> */}
            <div class="col main pt-5 mt-3">
 {/* search interns */}
 <div className="conatiner " id="internanimation">
        <div class="typing">
          <h2 class="text-uppercase">Search Interns</h2>
        </div>
      </div>
      <div class="container">
        <div class="row height d-flex justify-content-center align-items-center">
          <div class="col-md-8">
            <div class="search">
              <i class="fa fa-search"></i>
              <input
                type="text"
                class="form-control"
                placeholder="Have a question? Ask Now"
              />
              <button class="btn btn-primary">Search</button>
            </div>
          </div>
        </div>
      </div>
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
};

export default SearchInterns;
