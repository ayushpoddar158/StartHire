import React from 'react'
import '../style/StudentDashboard/StudentNotification.css'
const StudentNotification = () => {
  return (
    <>

    <div>
        <div class="container-fluid" id="main">
            <div class="row row-offcanvas row-offcanvas-left">
                <div class="col main pt-5 mt-3">
                    <section class="section-50 notimain2">
                        <div class="container">
                            <h3 class="m-b-50 heading-line">Notifications <i class="fa fa-bell text-muted"></i></h3>

                            <div class="notification-ui_dd-content">
                                <div class="notification-list notification-list--unread">
                                    <div class="notification-list_content">

                                        <div class="notification-list_detail">
                                            <p><b>John Doe</b> reacted to your post</p>
                                            <p class="text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.</p>
                                            <p class="text-muted"><small>10 mins ago</small></p>
                                        </div>
                                    </div>

                                </div>
                                <div class="notification-list notification-list--unread">
                                    <div class="notification-list_content">

                                        <div class="notification-list_detail">
                                            <p><b>Richard Miles</b> liked your post</p>
                                            <p class="text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.</p>
                                            <p class="text-muted"><small>10 mins ago</small></p>
                                        </div>
                                    </div>

                                </div>
                                <div class="notification-list">
                                    <div class="notification-list_content">

                                        <div class="notification-list_detail">
                                            <p><b>Brian Cumin</b> reacted to your post</p>
                                            <p class="text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.</p>
                                            <p class="text-muted"><small>10 mins ago</small></p>
                                        </div>
                                    </div>

                                </div>
                                <div class="notification-list">
                                    <div class="notification-list_content">

                                        <div class="notification-list_detail">
                                            <p><b>Lance Bogrol</b> reacted to your post</p>
                                            <p class="text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.</p>
                                            <p class="text-muted"><small>10 mins ago</small></p>
                                        </div>
                                    </div>

                                </div>
                                <div class="notification-list">
                                    <div class="notification-list_content">

                                        <div class="notification-list_detail">
                                            <p><b>Parsley Montana</b> reacted to your post</p>
                                            <p class="text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.</p>
                                            <p class="text-muted"><small>10 mins ago</small></p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* <div class="text-center">
    <a href="#!" class="dark-link">Load more activity</a>
</div> */}

                        </div>
                    </section>

                </div>
            </div>
        </div>
    </div>






</>
  )
}

export default StudentNotification