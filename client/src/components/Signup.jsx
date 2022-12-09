import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userSignUp } from '../redux/action';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Signup = () => {
  const { user, loading } = useSelector((state) => state);
  console.log(loading);
  console.log(user);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adresse, setAdresse] = useState("");
    const [telephone, setTelephone] = useState("");

    const dispatch=useDispatch();
    const handleSubmit=(e)=>{
         e.preventDefault();
         dispatch(userSignUp({fullName,email,password,telephone,adresse}))
    }
  return (
    <div id='signUp'>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div > 
        <Form onSubmit={handleSubmit} className='signUp_Form' >

        <h2 className='titleSignUp'>Sign Up</h2>
        <Form.Group className="mb-3" >
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder='Full Name'  value={fullName} onChange={e=>setFullName(e.target.value)}/>
          </Form.Group>
          

          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder='Entry your email'  value={email} onChange={e=>setEmail(e.target.value)} />
        </Form.Group>
  


        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} />
        </Form.Group>


        <Form.Group className="mb-3" >
          <Form.Label>Adresse</Form.Label>
          <Form.Control type="text" placeholder='Adresse' value={adresse} onChange={e=>setAdresse(e.target.value)}/>
          </Form.Group>
          
          <Form.Group className="mb-3" >
          <Form.Label>Telephone</Form.Label>
          <Form.Control type="text" placeholder='Telephone' value={telephone} onChange={e=>setTelephone(e.target.value)} />
          </Form.Group>
          <hr />
        <Button style={{marginBottom:"20px"}}variant="primary" type="submit">
        Sign UP
        </Button>
      </Form>
      </div>
        )}
        
    </div>
  )
}

export default Signup
