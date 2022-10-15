import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../../Firebase/firebase.init';
import login from "../../assests/login1.png"

const auth = getAuth(app)

const LoginBootsrap = () => {
    const [success, setSuccess] = useState(false);
    const [resetEmail, setResetEmail] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        setSuccess(false)
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
            setSuccess(true)
        })
        .catch(error => {
            console.error("error", error)
        })
    }

    const handleEmailBlur = (event) => {
        const email = event.target.value;
        setResetEmail(email)
    }

    const handleForgetPassword = () => {
        if(!resetEmail){
            alert("enter your email")
        }
        sendPasswordResetEmail(auth, resetEmail)
        .then(() =>{
            alert("check your email send reset password")
        })
        .catch(error => {
            console.error(error)
        })
    }

    return (
            <div className='d-flex justify-content-center align-items-center mx-5'>
            <div className='w-75'>
                <img className='w-75' src={login} alt="" />
            </div>
            <div className='w-25 p-5 bg-black text-white rounded text-center me-5 shadow-lg'>
                <h2 className='mb-3 text-primary'>Login Form</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control onBlur={handleEmailBlur} type="email" name="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" name="password" placeholder="Password" />
                    </Form.Group>
                    <p>Forget password <button onClick={handleForgetPassword} className='btn text-primary btn-link ms-0'>reset</button> </p>
                    <Button className='py-1 px-4' variant="primary" type="submit">
                        Log In
                    </Button>
                    {success && <p className='text-success'>Successfully Login!!!!!</p>}
                    <p>new To the website!! Please <Link to="/register">Register</Link></p>
                   
                </Form>
            </div>
            </div>
    );
};

export default LoginBootsrap;