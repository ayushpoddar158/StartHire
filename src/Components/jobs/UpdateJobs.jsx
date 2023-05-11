// Authentication @Firebase 
import { Auth } from "../../Firebase";
import { AuthContext } from "../../Authorizer";
import { useEffect } from "react";
import { Box } from "@mui/material";
import Select from "react-select";


// Data import @Firebase
import { db } from "../../Firebase";
import {
    query,
    getDocs,
    collection,
    getDoc,
    addDoc,
    updateDoc,
    doc,
    where
} from "firebase/firestore";


import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Codinglanginfo } from '../Codinglanginfo';
import { WithContext as ReactTags } from 'react-tag-input';
import "../../style/Studentprofileform.css"
import Aside from "../../DashboardArea/Aside";
import { TextField } from "@material-ui/core";




const suggestions = Codinglanginfo.map((country) => {
    return {
        id: country,
        text: country,
    };
});

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];



const UpdateJobs = () => {
    const { id } = useParams();
    const { currentUser } = React.useContext(AuthContext);
    const [data, setData] = useState();
    const [docRef, setDocRef] = useState();
    const [linkImageUrl, setLinkImageUrl] = useState(null);
    // const [tags, setTags] = React.useState([]);
    const navigate = useNavigate();
    const [jobData, setJobData] = useState(
        {
            jobTitle: "",
            jobDescription: "",
            jobLocation: "",
            skills: []

        }
    )



    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, "startups"), where("uid", "==", currentUser.uid));
                const docs = await getDocs(q);
                const doc = docs.docs[0];
                setDocRef(doc);
                setData(doc.data());
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    },[])

    useEffect(() => {
        const loadData = async () => {
            if (currentUser) {
                if (data) {
                    if (data.updatedProfile) {
                        let jobRef = doc(db, "jobs", id);
                        let job = await getDoc(jobRef);
                        if (job) {
                            setJobData(job.data().details);
                        }
                    }
                }
            }
        };
        loadData();
    }, [data]);

    // sample job id: QL5KnfEwv9SNw57bAAwb

    useEffect(() => {
        console.log(jobData)
    }, [jobData])


    const getData = (e) => {
        const { value, name } = e.target;
        setJobData(() => {
            return {
                ...jobData,
                [name]: value,
            }
        });
    }



    // tag functions



    const handleAddition = (tag) => {
        console.log(tag)
        console.log("changes")
        setJobData(() => {
            return {
                ...jobData,
                ["skills"]: tag,
            };
        });
        console.log(jobData)


    };

    useEffect(() => {
        console.log("jobdata", jobData)
    }, [jobData])


    // tag functions end 





    const updateDocument = async (id) => {
        if (docRef) {
            console.log("inside update if ");
            try {
                const jobRef = doc(db, "jobs", id);
                const updateJob = await updateDoc(jobRef, {
                    details: jobData
                });
                alert("Information successfully updated!");
            } catch (error) {
                console.log("Error updating document: ", error);
            }
        }
    }



    const submitHandler = async () => {
        console.log("inside submit handler");
        try {
            await updateDocument(id);
            navigate("/Jobs")
        } catch (err) {
            console.log(err);
        }
    }




    if (currentUser) {
        return (
            <>
                <div class="container bootstrap snippet" id='studentformmain'>
                    <div class="row mt-2">

                        {/* <!--/col-3--> */}
                        <div class="col-sm-9">
                            {/* <ul class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#home">Home</a></li>
                <li><a data-toggle="tab" href="#messages">Menu 1</a></li>
                <li><a data-toggle="tab" href="#settings">Menu 2</a></li>
              </ul> */}


                            <div class="tab-content">
                                <div class="tab-pane active" id="home">
                                    <hr />
                                    <form class="form" onSubmit={submitHandler} id="registrationForm">
                                        <div className="container maindivstudent">
                                            <div class="form-group ">

                                                <div class="col-xs-12">


                                                    <label className="firstnamecls" for="first_name"><h3>Job Title</h3></label>
                                                    <TextField type="text"
                                                        onChange={getData}
                                                        class="form-control"
                                                        required
                                                        name="jobTitle"
                                                        id="first_name"
                                                        placeholder="Job Title"
                                                        value={jobData.jobTitle}
                                                    />
                                                </div>
                                            </div>
                                            <div class="form-group">

                                                <div class="col-xs-12">
                                                    <label for="last_name"><h3>Job Description</h3></label>
                                                    <TextField type="text"
                                                        onChange={getData}
                                                        class="form-control"
                                                        name="jobDescription"
                                                        id="last_name"
                                                        value={jobData.jobDescription}
                                                        placeholder="Job Description"
                                                        title="enter your last name if any."
                                                        required />
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <div class="col-xs-12">
                                                    <label for="location"><h3>Location</h3></label>
                                                    <TextField type="text"
                                                        onChange={getData}
                                                        name='jobLocation'
                                                        class="form-control"
                                                        required id="location"
                                                        value={jobData.jobLocation}
                                                        placeholder="Job Location"
                                                        title="enter a location" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                            </div>


                                            <div class="form-group selectDiv" >
                                                <div class="col-xs-12 YearOf">
                                                    <label for="YOG">
                                                        <h3>Required Skills</h3>
                                                    </label>
                                                    <Select onChange={handleAddition}

                                                        isMulti
                                                        name="colors"
                                                        options={Codinglanginfo}
                                                        className="basic-multi-select"
                                                        classNamePrefix="select"
                                                        placeholder="Enter Your Skills"

                                                        value={jobData.skills}


                                                    />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="col-xs-12">
                                                    <br />
                                                    <button class="btn btn-lg btn-success" onClick={submitHandler} type="button"><i className="fa-regular fa-folder-arrow-up"></i>Update Job</button>
                                                    {/* <button class="btn btn-lg" type="reset"><i class="glyphicon glyphicon-repeat"></i> Reset</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <hr />

                                </div>


                            </div>
                            {/* <!--/tab-pane--> */}
                        </div>
                        {/* <!--/tab-content--> */}

                    </div>
                    {/* <!--/col-9--> */}
                </div>
                {/* <!--/row--> */}

            </>
        )
    }

}

export default UpdateJobs






