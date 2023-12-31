import React, { useRef, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../utils/apiHelper';

import Error from './Error';
import UserContext from '../context/UserContext';

function UserSignUp() {
    const { actions } = useContext(UserContext);
    
    //state
    const [errors, setErrors] = useState([])

    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);

    const navigate = useNavigate();

    //Event handlers
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }

        //send request to server to sign up user
        try {
            const res = await api("/users", "POST", data);
            if (res.status === 201) {
                console.log(`${data.firstName} ${data.lastName} is successfully signed up and authenticated`)
                await actions.signIn(data)
                navigate('/')
            } else if (res.status === 400) {
                const data = await res.json();
                setErrors(data.errors)
            } else {
                throw new Error();
            }

        } catch (error) {
            console.log(error);
            setErrors(['Internal error occurred, try again'])
            navigate('/error');
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }

    return (
        <div className="form--centered">
            <h2>Sign Up</h2>
            <div className="validation--errors">
                <Error errors={errors} />
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" ref={firstName} />
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" ref={lastName} />
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" ref={password} />
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Already have a user account? Click here to <Link to='/signin'>sign in</Link>!</p>
        </div>
    )
}

export default UserSignUp