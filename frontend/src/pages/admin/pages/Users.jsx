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
    <div class='overflow-auto' style={{ overflow: 'auto', maxHeight: '90vh', width: '100%', maxWidth: '100%' }}>
      <h1 style={{ textAlign: 'left' , padding: '10px'}}>Admins:</h1>
      {/* Render Admins */}
      {Admins && Admins.map((admin, index) => (
        <UserCard key={index} user={admin} ></UserCard>
      ))}
      <h1 style={{ textAlign: 'left' , padding: '10px'}}>Users:</h1>
      {/* Render Users */}
      {Users && Users.map((user, index) => (
        <UserCard key={index} user={user}></UserCard>
      ))}
    </div>
  )
}

export default Users