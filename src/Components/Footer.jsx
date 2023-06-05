import React from "react";
import { Link } from "react-router-dom";

import "../style/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <>
      {/* <!-- FOOTER START --> */}
      <div className="footer">
        <div className=" footermain row">
          <div className="col-sm-2 eachcol3">
            <ul>
            <h1>Page</h1>
              <li>
                <Link className="footerlinks" to={"/"}>Home</Link>
              </li>
              <li>
                <Link className="footerlinks" to={"/About"}>About</Link>
              </li>
              <li>
                <Link className="footerlinks" to={"/Contact"}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-2 eachcol3">
            <ul>
            <h1>UseFull Links</h1>
              <li>
                <Link className="footerlinks" to={"https://www.aicnalanda.com/"} target="_blank">
                  Aic Nalanda
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-sm-3 eachcol3">
            <ul>
            <h1>Get In Touch</h1>
              <li>
                AIC-Nalanda Institute Of Technology Foundation, Buddhist Villa,
                Chandaka Bhubaneswar, Odisha-754005
              </li>
              <li>
                <span>
                  {" "}
                  <FontAwesomeIcon icon={faPhone} size="lg" />
                </span>{" "}
                +91-8249585065
              </li>
              <li>
                <span>
                  <FontAwesomeIcon icon={faEnvelope} size="lg" />
                </span>
                <Link className="footerlinks" mailto={"incmgr@aicnalanda.com"}>inr@aicnalanda.com</Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-3 eachcol3">
            <ul>
            <h1>Our Location</h1>
            <iframe className="aicmap"
              allowfullscreen=""
        loading="lazy"
        width="300"
  height="220"
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.3984439566116!2d85.75842477393235!3d20.366455210199078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19086f69501fb1%3A0x5bc1bfbd700865ad!2sAtal%20Incubation%20Center-Nalanda%20Institute%20of%20Technology%20Foundation(AIC-NITF)!5e0!3m2!1sen!2sin!4v1685597886750!5m2!1sen!2sin" ></iframe>
            </ul>
          </div>

       
        </div>
      </div>
      {/* <!-- END OF FOOTER --> */}
    </>
  );
};

export default Footer;
