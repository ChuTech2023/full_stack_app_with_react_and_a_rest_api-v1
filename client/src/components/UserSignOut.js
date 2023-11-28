import React from 'react'
import { Navigate } from 'react-router-dom'

function UserSignOut() {

  return (
    <Navigate to='/' replace />
  )
}

export default UserSignOut