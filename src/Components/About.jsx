import React from "react";
import { Button } from "@material-ui/core";
import "../style/Aboutus.css";
<link
  href="https://fonts.googleapis.com/css?family=Roboto"
  rel="stylesheet"
></link>;
import { Link } from "react-router-dom";
import poster1 from "../assets/posterimg1.jpg";

const About = () => {
  return (
    <>
      <div className="mianAbourSection">
        <div className="maininermain">
          <div className="innermain1 about row">
            <div className="innermain1_1 col-sm-6">
              <p>
                Prepare to embark on a transformative journey as AIC-Nalanda
                unveils an exceptional occasion where aspiring individuals get a
                chance to experience the vibrant world of entrepreneurship.
              </p>
            </div>
            <div className="innermain1_2 col-sm-6">
              <img src={poster1} alt="ge" />
            </div>
          </div>
          <div className="innermain2 row  about">
            <div className="innermain1_2 col-sm-6">
              <img src={poster1} alt="ge" />
            </div>
            <div className="innermain1_1 col-sm-6">
              <p>
                StartHire aims to serve as a powerful nexus, bridging the gap
                between academia and the startup ecosystem, granting able
                students a golden opportunity to engage with startups at the
                forefront of innovation.
              </p>
            </div>
          </div>
          <div className="innermain1 about row">
            <div className="innermain1_1 col-sm-6">
              <p>
                With a strong focus on internships, StartHire provides a
                seamless experience for students to explore exciting
                opportunities in the startup ecosystem and, also allows the
                Startups to browse through a diverse range of student profiles
                that align with their interests and needs.
              </p>
            </div>
            <div className="innermain1_2 col-sm-6">
              <img src={poster1} alt="ge" />
            </div>
          </div>
          <div className="innermain2 row  about">
            <div className="innermain1_2 col-sm-6">
              <img src={poster1} alt="ge" />
            </div>
            <div className="innermain1_1 col-sm-6">
              <p>
                StartHire goes beyond traditional job listings by offering a
                unique feature called <span>“The Collaboration Day”</span>,
                where students and startups come together in an immersive
                environment, to reveal their hidden identities and find out the
                feasibility of their Skill-to-Need Match. This innovative
                approach allows students to showcase their skills directly to
                startup representatives and allows the startups to find talented
                individuals to contribute to their growth and success, thereby
                fostering a mutually beneficial environment for both
                stakeholders.
              </p>
            </div>
          </div>
        </div>
        <div className="maininner2">
          <div className="takeaways">
            <h1>Takeaways</h1>
            <div className="hrtake"></div>
            <p>
              StartHire offers valuable takeaways for both startups and students
              alike.{" "}
            </p>
          </div>

          <div className="takeawaysection">
            <div className="TakeAwaysForStart row">
              <div className="starttakeleft col-sm-6">
                <h1>StartUp TakeAway</h1>
                <ul>
                  <li>
                    Provides access to a pool of talented and ambitious students
                    actively seeking internships.{" "}
                  </li>
                  <li>
                    By showcasing their needs-of-the-hour, startups can attract
                    driven individuals who can bring fresh perspectives and
                    energy to their teams.
                  </li>
                  <li>
                    Collaboration Day, a unique feature of StartHire, will offer
                    startups an opportunity to engage with students directly,
                    fostering meaningful connections and potential
                    collaborations.{" "}
                  </li>
                  <li>
                    Enables startups to tap into the diverse skill sets and
                    ideas of aspiring professionals, fuelling innovation and
                    growth within their organizations.{" "}
                  </li>
                </ul>
              </div>
              <div className="starttakeright col-sm-6">
                <img src={poster1} alt="" />
              </div>
            </div>
            <div className="TakeAwaysForstudent row">
              <div className="starttakeright col-sm-6">
                <img src={poster1} alt="" />
              </div>
              <div className="starttakeleft col-sm-6">
                <h1>Student TakeAway</h1>
                <ul>
                  <li>
                    Access to a wide range of internship opportunities at
                    dynamic startups.{" "}
                  </li>
                  <li>
                    Explore and connect with companies aligned with their
                    passions, helping them kickstart their careers in a
                    meaningful way.{" "}
                  </li>
                  <li>
                    Additionally, the Collaboration Day will allow students to
                    showcase their skills, creativity, and potential to
                    startups, leaving a lasting impression that can result in
                    bagging the chance for internships or even future
                    employment.{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="whocanapllydiv">
            <div className="innerwhoapply">
            <h1>Who can apply ?</h1>
            <ul>
              <li>
              Students pursuing any Graduation or Post-Graduation Course
              </li>
            </ul>

            <div className="whoapplyregister">
<h4>To secure your place at this immersive gathering, where students converge with startups to unleash their untapped potential </h4><Button variant="contained">REGISTER NOW</Button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
