import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Logine } from '../redux/action';
import  { Link, Navigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Login = () => {
  const { user, loading } = useSelector((state) => state);
  console.log(loading);
  console.log(user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
   
    const dispatch=useDispatch();
    const handleSubmit=(e)=>{
         e.preventDefault();
         dispatch(Logine({email,password}))
    }
  return (
    <div id='Login'>
          { loading?(<h1>loading.......</h1>):
            localStorage.getItem("token")?  <Navigate to="/profile" /> :(
              <div className='login_Form '>   

            <Form onSubmit={handleSubmit}>
              <h3 className='titleLogin'>LOGIN</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e=>setEmail(e.target.value)} />
              
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
            </Form.Group>
          
            <Button variant="primary" type="submit">
            Login
            </Button>
            <hr />
            <Form.Text className="text-muted">
            Don't have a Account <Link to="/Signup"> Create Now </Link>
              </Form.Text>
          </Form>
          </div> )
}
    </div> )
}

export default Login
