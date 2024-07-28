import React from 'react';
import { admindeleteaccount, getUsers } from '../../../features/auth/authSlice';
import { useDispatch } from 'react-redux';


const UserCard = ({ user }) => {
  const dispatch = useDispatch()

  const deleteUser = async() => {
    console.log('asdf')    
    const reponse = await dispatch(admindeleteaccount(user._id))

    if (reponse){
      dispatch(getUsers("Admin"))
      dispatch(getUsers("User"))
    }
  }

  return (
    <div className='card' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
      <p style={{ margin: '0 15px' }}>{user.name}</p>
      <p style={{ margin: '0 15px' }}>Email: {user.email}</p>
      <p style={{ margin: '0 15px' }}>ID: {user._id}</p>
      <button onClick={deleteUser}>Delete</button>
    </div>
  );
};

export default UserCard;