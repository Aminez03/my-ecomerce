import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


import "./Contact.css"

const ContactUs = () => {
  const [show, setShow] = useState(false);
  const [name, setNAme] = useState();
  const [email, setEmail] = useState();
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();
  const handle=()=>{
    setShow(false)
    setNAme("")
    setEmail("")
    setSubject("")
    setMessage("")

  }
  useEffect(() => {
 
  }, [show])
  



        
  return (
    <div className='contact'>
      

    <form id="fs-frm" name="simple-contact-form" accept-charset="utf-8" action="https://formspree.io/f/mpznvwre" method="post">
    <h3> Contact Us</h3>
    <fieldset id="fs-frm-inputs">
   
   
    <input type="text" name="name" id="full-name" placeholder="Enter your Full name" required="" value={name}/>
   
    <input type="email" name="email" id="email-address" placeholder="Enter your email" required="" value={email}/>
   
    <input type="text" name="subject" id="email-subject"  placeholder="Subject" required="" value={subject}/>

    <textarea rows="5" name="message" id="message" placeholder="Message" required="" value={message}></textarea>
    </fieldset>
  <input type="submit" value="Submit"  id="input-submit"  onClick={() => setShow(true) } ></input>
  </form>
  <div className='alert'>
        <Alert show={show} variant="success">
        <Alert.Heading >Thank you!</Alert.Heading>
        <p>
        Your message has been sent.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => handle()} variant="outline-success">
            Close me
          </Button>
        </div>
      </Alert>
      </div>


  </div>
  );
   

  
}

export default ContactUs