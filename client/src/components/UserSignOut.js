import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import UserContext from '../context/UserContext'

function UserSignOut() {

  const { actions } = useContext(UserContext);

  //on page load sign up user
  useEffect(() => {
    actions.signOut();
  })

  return (
    <Navigate to='/' replace />
  )
}

export default UserSignOut