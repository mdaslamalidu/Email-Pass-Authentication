import React from 'react';

const Bootstrap = () => {
    return (
        <div>
            <form onSubmit={submitHandle}>
                <input onBlur={handleChangeEmail} type="email" name="email" id="" placeholder="Enter Email" />
                <br />
                <input onChange={handlePasswordChange} type="password" name="password" id="" placeholder="Enter Password" />
                <br />
                <button>Register</button>
            </form>
        </div>
    );
};

export default Bootstrap;