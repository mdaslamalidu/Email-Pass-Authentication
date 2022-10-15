import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification} from 'firebase/auth'
import app from '../Firebase/firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app)

const BootstrapReat = () => {
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        setSuccess(false)
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;


        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setPasswordError("Please Provide at least two uppercase")
            return;
        }
        if(password.length < 6){
            setPasswordError("Please Provide at least 6 character")
            return;
        }
        if (!/(?=.*[!@#$&*])/.test(password)){
            setPasswordError("Please Provide at least one special character")
            return;
        }

        setPasswordError("");

        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
            setSuccess(true)
            form.reset()
            varefyEmail()
        })
        .catch(error => {
            console.error("error", error)
            setPasswordError(error.message)
        })
    }

    const varefyEmail = () => {
        sendEmailVerification(auth.currentUser)
        .then(() => {
            alert("check your email and varefy your email address")
        })
    }


    return (
        <div className='w-50 mx-auto'>
            <h3>Register your new account</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                <p className='text-danger'>{passwordError}</p>
                {success && <p className='text-success'>user created successfully</p>}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <p>Already have an account <Link to="/login">Log in</Link></p>
            </Form>
        </div>
    );
};

export default BootstrapReat;