import React, { useRef, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Error from './Error';
import UserContext from '../context/UserContext';

function UserSignUp() {
    const { actions } = useContext(UserContext);
    //sate
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
            lastNameName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }
        try {
            const res = await fetch('http://localhost:5000/api/users',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)

                })
            if (res.status === 201) {
                console.log(`${data.firstName} ${data.lastName} is authenticated`)
                await actions.signIn(user)
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
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }

    return (
        <div className="form--centered">
            <h2>Sign Up</h2>
            <div class="validation--errors">
                <Error errors={errors} />
            </div>

            <form onSubmit={handleSubmit}>
                <label for="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" value="" />
                <label for="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" value="" />
                <label for="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" value="" />
                <label for="password">Password</label>
                <input id="password" name="password" type="password" value="" />
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onclick={handleCancel}>Cancel</button>
            </form>
            <p>Already have a user account? Click here to <Link to='/signin'>sign in</Link>!</p>
        </div>
    )
}

export default UserSignUp