import '../style/StudentDashboard/StudentDashboard.css'


// react icons 


const StudentDashboard = () => {

    const LogOut = () => {
        Auth.signOut();
        setIsUser(false);
        navigate("/Login");
    }
    return (
        <>
            <div className="StudentMainDash">

                <div >
                    <h1>Student Dashboard</h1>
                </div>
            </div>

        </>

    )
}

export default StudentDashboard