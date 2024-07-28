import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, reset } from '../../../features/auth/authSlice'
import UserCard from '../components/UserCard'

function Users() {
  const dispatch = useDispatch()
  const {user, Users, Admins, isLoading, isError, message } = useSelector(
    (state) => state.auth
  )
  
  if (!isLoading && !isError && Admins.length === 0 ) {
    dispatch(getUsers("Admin"));
    dispatch(getUsers("User"))
  }
  

  return (
    <div>
      <h1>Admins:</h1>
      {/* Render Admins */}
      {Admins && Admins.map((admin, index) => (
        <UserCard key={index} user={admin}></UserCard>
      ))}
      <h1>Users:</h1>
      {/* Render Users */}
      {Users && Users.map((user, index) => (
        <UserCard key={index} user={user}></UserCard>
      ))}
    </div>
  )
}

export default Users