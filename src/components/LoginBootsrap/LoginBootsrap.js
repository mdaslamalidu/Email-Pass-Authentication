import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../../Firebase/firebase.init';

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
            <div className='w-50 mx-auto'>
                <h2>Log in your account</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handleEmailBlur} type="email" name="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                {success && <p className='text-success'>Successfully Login!!!!!</p>}
                <p>new To the website!! Please <Link to="/register">Register</Link></p>
                <p>Forget password <button onClick={handleForgetPassword} className='btn text-primary btn-underline'>reset</button> </p>
            </Form>
            </div>
    );
};

export default LoginBootsrap;