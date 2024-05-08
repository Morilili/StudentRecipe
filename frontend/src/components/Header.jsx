import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {logout, reset} from "../features/auth/authSlice"
import { useState, useEffect } from 'react'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isAuthorized, isLoading, isError, message} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      
      <div className='logo'>
        <Link to='/'>StudentRecipe</Link>
      </div>
      
      <ul>
      
        {user ? (
          <li>
            <button className='btn' onClick={onLogout}>
              Logout
            </button>
          </li>

        ) : (
          <>
            <li>
              <Link to='/login'>
                Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>

  )
  
}

export default Header