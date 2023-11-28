import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function UserSignUp() {
    const navigate = useNavigate();

    //Event handlers
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }

  return (
    <div className="form--centered">
        <h2>Sign Up</h2>
        
        <form onSubmit={handleSubmit}>
            <label for="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" value=""/>
            <label for="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" value=""/>
            <label for="emailAddress">Email Address</label>
            <input id="emailAddress" name="emailAddress" type="email" value=""/>
            <label for="password">Password</label>
            <input id="password" name="password" type="password" value=""/>
            <button className="button" type="submit">Sign Up</button>
            <button className="button button-secondary" onclick={handleCancel}>Cancel</button>
        </form>
        <p>Already have a user account? Click here to <Link to='/signin'>sign in</Link>!</p>
    </div>
  )
}

export default UserSignUp