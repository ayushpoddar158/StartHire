import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
         <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{backgroundColor:"#e9ecef"}}>
            <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <li class="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5>xyx StartUp</h5></a></li>
                <li class="nav-item mb-2 "><Link class="nav-link text-secondary" to="/StartUpProfile"><i class="fas fa-user font-weight-bold"></i> <span className="ml-3">Profile</span></Link></li>
              
                <li class="nav-item mb-2"><Link class="nav-link text-secondary" to="/StudentLists"><i class="far fa-chart-bar font-weight-bold"></i> <span className="ml-3">Student Lists</span></Link></li>
                <li class="nav-item mb-2"><Link class="nav-link text-secondary" to="/SearchInterns"><i class="fas fa-file-export font-weight-bold"></i><span className="ml-3">Search Interns</span></Link></li>
             
           
             
                <li class="nav-item mb-2"><Link class="nav-link text-secondary" to="/Notification">Notifications</Link></li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#">Themes</a></li>
            </ul>
       </div>
    )
}
 
export default Sidebar