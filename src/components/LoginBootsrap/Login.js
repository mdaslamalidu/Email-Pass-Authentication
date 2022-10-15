import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../../Firebase/firebase.init';
import login from "../../assests/login1.png"
import Swal from 'sweetalert2'
import ResetPassword from '../ResetPassword/ResetPassword';


const auth = getAuth(app)

const Login = () => {
    const [modalShow, setModalShow] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
            )
        })
        .catch(error => {
            console.error("error", error)
        })
    }


    return (
            <div className='d-flex justify-content-center align-items-center mx-5'>
            <div className='w-50 me-5'>
                <img className='img-fluid' src={login} alt="" />
            </div>
            <div className='p-5 rounded me-5 shadow-lg'>
                <h2 className='mb-3 text-primary text-shadow'>Login</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" />
                    </Form.Group>
                    <button onClick={() => setModalShow(true)} className='btn text-primary btn-link p-0'>Forget password? </button>
                    <Button className='py-1 w-100' variant="primary" type="submit">
                        Log In
                    </Button>
                    <p>new To the website!! Please <Link to="/register">Register</Link></p>
                </Form>

                <ResetPassword show={modalShow}
                    onHide={() => setModalShow(false)} 
                />
                
            </div>
            </div>
    );
};

export default Login;

