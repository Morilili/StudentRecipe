import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { adminLogin, reset } from '../../../features/auth/authSlice'
import { ToastContainer, toast} from 'react-toastify'

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  
  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {user, isAuthorized, isAdmin, isLoading, isError, message} = useSelector(
    (state) => state.auth)
  

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
  
      dispatch(adminLogin(userData))
  }

  useEffect(() =>{
    // if (isError){
    //   toast.error(message)
    // }

    if (user && user.data.role === "Admin"){
      navigate('/admin')
    }
    
    // dispatch(reset())
  }, [user, isAuthorized, isAdmin,isError, message, navigate, dispatch]);

  return (
    <>
      <section className='heading'>
        <h1>
          Admin Dashboard Login
        </h1>
        
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
            <button onClick={() => {navigate('/') ; window.location.reload()}}> Go back to home page</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default AdminLogin