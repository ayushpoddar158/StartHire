import React from 'react'
import Aside from './Aside'
import { Link } from 'react-router-dom';



const Jobs = () => {
  return (
    <>
      <div>
        <div class="container-fluid" id="main">
          <div class="row row-offcanvas row-offcanvas-left">
            {/* <Jobs/> strat */}
            <h1>jobs</h1>
            <div>
              <Link to="/createjobs"><button className="btn btn-primary" type="button">Create Job</button></Link>
            </div>
            {/* <Jobs/> end */}

          </div>
        </div>
      </div>

    </>
  )
}

export default Jobs