import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function UserSignIn(props) {

    //State
    const emailAddress = useRef();
    const password = useRef();
    const navigate = useNavigate();

    //Event handlers
    const handleSubmit = (event) => {
        event.preventDefault();
        props.UserSignIn(emailAddress.value, password.value)
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }
    return (
        <div className="form--centered">
            <h2>Sign In</h2>

            <form onSubmit={handleSubmit}>
                <label for="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" value="" />
                <label for="password">Password</label>
                <input id="password" name="password" type="password" value="" />
                <button className="button" type="submit">Sign In</button>
                <button class="button button-secondary" onclick={handleCancel}>Cancel</button>
            </form>
            <p>Don't have a user account? Click here to <Link to='/signup'>sign up</Link>!</p>

        </div>
    )
}

export default UserSignIn