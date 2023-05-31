import React from 'react'
import '../style/Contact.css'

const Contact = () => {
  return (
    <>
    <div className="Contactcontainer">

  

    <div class="contact-form contcatformmain" style={{padding:"0px",marginBottom:"0px"}}>
            <div class="contact-image">
                <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact"/>
            </div>
            <form method="post">
                <h3>Drop Us a Message</h3>
               <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <input type="text" name="txtName" class="form-control" placeholder="Your Name *" value="" />
                        </div>
                        <div class="form-group">
                            <input type="text" name="txtEmail" class="form-control" placeholder="Your Email *" value="" />
                        </div>
                        <div class="form-group">
                            <input type="text" name="txtPhone" class="form-control" placeholder="Your Phone Number *" value="" />
                        </div>
                        <div class="form-group">
                            <input type="submit" name="btnSubmit" class="btnContact" value="Send Message" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <textarea id='contacttextid' name="txtMsg" class="form-control" placeholder="Your Message *" ></textarea>
                        </div>
                    </div>
                </div>
            </form>
</div>
  </div>
    </>
  )
}

export default Contact