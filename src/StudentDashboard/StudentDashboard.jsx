import { useEffect } from 'react';
import '../style/StudentDashboard/StudentDashboard.css'
import { updateDoc } from 'firebase/firestore';


// react icons 


const StudentDashboard = (props) => {
    const userRef = props.userData;

    useEffect(() => {
        if (userRef) {
            const updateVerif = async () => {
                if (userRef.data().VerifIsVerified == false) {
                    await updateDoc(userRef.ref, {
                        VerifIsVerified: true
                    }).then(() => {
                        alert(" Your account is now verified !")
                    })
                }
            }
            updateVerif();
        }
    }, [userRef])


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