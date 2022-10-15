import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import app from '../../Firebase/firebase.init';
import Swal from 'sweetalert2'

const auth = getAuth(app)

const ResetPassword = (props) => {
    const [email, setEmail] = useState('');

    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                props.onHide();
                Swal.fire(
                    'Good job!',
                    'Change your password check your email'
                )
                setEmail("");
            })
            .catch(error => {
                console.error(error)
            })
    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Forget Password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className='text-danger'>Reset Password</h5>
                <input onBlur={(e) => setEmail(e.target.value)} className='p-3 w-100' type="email" placeholder='Enter Email' />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleResetPassword}>update</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ResetPassword;