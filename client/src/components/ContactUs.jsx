import React from 'react';
// import { useForm, ValidationError } from '@formspree/react';

import "./Contact.css"

const ContactUs = () => {
    // const [state, handleSubmit] = useForm("mpznvwre");

        
  return (
    <div className='contact'>
    <form id="fs-frm" name="simple-contact-form" accept-charset="utf-8" action="https://formspree.io/f/mpznvwre" method="post">
    <h3> Contact Us</h3>
    <fieldset id="fs-frm-inputs">
   
    {/* <label for="full-name">Full Name</label> */}
    <input type="text" name="name" id="full-name" placeholder="Enter your Full name" required=""/>
    {/* <label for="email-address">Email Address</label> */}
    <input type="email" name="email" id="email-address" placeholder="Enter your email" required=""/>
    {/* <label for="message">Message</label> */}
    <input type="text" name="subject" id="email-subject"  placeholder="Subject" required=""/>
    <textarea rows="5" name="message" id="message" placeholder="Message" required=""></textarea>
    </fieldset>
  <input type="submit" value="Submit"  id="input-submit"></input>
  </form>
  </div>
  );
   

  
}

export default ContactUs