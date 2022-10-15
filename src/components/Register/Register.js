import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from 'firebase/auth'
import app from '../../Firebase/firebase.init';
import { Link } from 'react-router-dom';
import register from "../../assests/register.png";
import "./Register.css";

const auth = getAuth(app)

const Register = () => {
    const [error, SetError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isDesabled, setIsdesabled] = useState(true);

    const handleSubmit = event => {
        event.preventDefault();
        setSuccess(false)
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        if(!/\S+@\S+\.\S+/.test(email)){
            SetError("Please give a valid Email")
            return;
        }

        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            SetError("Please Provide at least two uppercase")
            return;
        }
        if(password.length < 6){
            SetError("Please Provide at least 6 character")
            return;
        }
        if (!/(?=.*[!@#$&*])/.test(password)){
            SetError("Please Provide at least one special character")
            return;
        }

        SetError("");

        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            updateName(name)
            verify();
            console.log(user)
        })
        .catch(error => {
            SetError(error.message)
        })

    }


    const updateName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            alert("you name has updated")
        }).catch((error) => {
            SetError(error)
        });
    }

    const verify = () => {
        sendEmailVerification(auth.currentUser)
        .then(() => {
            alert("verify your email send email verification. check your email!!")
        })
    }

    return (
        <div className='d-flex justify-content-center align-items-center mx-5'>
            <div className='w-50 me-5'>
                <img className='img-fluid' src={register} alt="" />
            </div>
            <div className='width-register p-5 rounded me-5 shadow-lg'>
                <h2 className='mb-3 text-primary text-shadow'>Registration</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Your Name:</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter Name" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" required />
                    </Form.Group>

                    <p><input onClick={() => setIsdesabled(!isDesabled)} type="checkbox"/> Terms & Conditions</p>

                    <p className='text-danger'>{error}</p>
                    {success && <p className='text-success'>user created successfully</p>}
                    <Button className='w-100' variant="primary" type="submit" disabled={isDesabled}> 
                        Registration
                    </Button>
                    <p>Already have an account <Link to="/login">Log in</Link></p>
                </Form>
            </div>
        </div>
    );
};

export default Register;