import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import {useSelector, useDispatch} from 'react-redux'
import { ToastContainer, toast} from 'react-toastify'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  
  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const {user, isAuthorized, isLoading, isError, message} = useSelector(
    (state) => state.auth)
  
    
  useEffect(() =>{
    if (isError){
      toast.error(message)
    }

    if (isAuthorized || user){
      navigate('/')
    }
    
    dispatch(reset())
  }, [user, isAuthorized, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  
    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  return (
    <>
      <section className='heading'>
        <h1>
          Login
        </h1>
        <p>Login to ur personal account please use this website uwu.. luv u bb</p>
      </section>
      
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='.btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login