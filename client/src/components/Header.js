import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import UserContext from '../context/UserContext'

function Header() {
    const { user } = useContext(UserContext);
    const location = useLocation();

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                    <Link to='/'>Courses</Link>
                </h1>
                <nav>
                    {
                        //Show user & signout when logged in 
                        user ? (
                            <ul className="header--signedin">
                                <li>Welcome, {user.firstName} {user.lastName}!</li>
                                <li><Link to='/signout'>Sign Out</Link></li>
                            </ul>
                        ) : (
                            <ul className="header--signedout">
                                <li><Link to='/signup'>Sign Up</Link></li>
                                <li><Link to='/signin' state={{ from: location.pathname }}>Sign In</Link></li>
                            </ul>
                        )
                    }

                </nav>
            </div>
        </header>
    )
}

export default Header