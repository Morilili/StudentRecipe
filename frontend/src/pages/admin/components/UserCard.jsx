import React from 'react';
import { admindeleteaccount, getUsers } from '../../../features/auth/authSlice';
import { useDispatch } from 'react-redux';


const UserCard = ({ user }) => {
  const dispatch = useDispatch()

  const deleteUser = async() => {
    const reponse = await dispatch(admindeleteaccount(user._id))

    if (reponse){
      dispatch(getUsers("Admin"))
      dispatch(getUsers("User"))
    }
  }

  return (
    <div className='card' style={{ width: '70vw', padding: '20px', boxSizing: 'border-box',  margin: '0 auto'  }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <p style={{padding: '5px'}}>{user.name}</p>
        <p style={{ padding: '5px', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px' }}>Email: {user.email}</p>
        <p style={{ padding: '5px', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px' }}>ID: {user._id}</p>
        <button className='btn btn-primary' onClick={deleteUser}>Delete</button>
      </div>
    </div>
  );
};

export default UserCard;