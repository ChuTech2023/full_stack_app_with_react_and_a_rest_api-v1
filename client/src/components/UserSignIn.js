import React, { useRef, useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';

import UserContext from '../context/UserContext';
import Error from './Error';

function UserSignIn() {
    //state
    const [errors, setErrors] = useState([])

    const { actions } = useContext(UserContext);
    const location = useLocation();

    const emailAddress = useRef(null);
    const password = useRef(null);

    const navigate = useNavigate();

    //Event handlers
    const handleSubmit = async (event) => {

        try {
            event.preventDefault();
            const user = await actions.signIn({ emailAddress: emailAddress.current.value, password: password.current.value })
            let from = "/";
            if (location.state) {
                from = location.state.from
            }
            if (user) {
                navigate(from);
            } else {
                setErrors(["Login failed"]);
            }
        } catch (error) {
            navigate('/error')
        }


    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }
    return (
        <div className="form--centered">
            <h2>Sign In</h2>

            <div className="validation--errors">
                <Error errors={errors} />
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" ref={password} />
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Don't have a user account? Click here to <Link to='/signup'>sign up</Link>!</p>

        </div>
    )
}

export default UserSignIn