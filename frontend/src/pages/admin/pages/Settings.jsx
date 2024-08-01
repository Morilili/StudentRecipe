import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { editme , reset } from '../../../features/auth/authSlice'
import {useSelector, useDispatch} from 'react-redux'
import { toast} from 'react-toastify'
import Spinner from '../../../components/Spinner'

function Settings() {
  const [formData, setFormData] = useState({
    password: '',
  })
  
  const { name, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isAuthorized, isLoading, isError, message} = useSelector(
    (state) => state.auth)
  
  
  useEffect(() =>{
    dispatch(reset())
  }, [user, isAuthorized, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
  
    const userData = {
      password,
    }

    const edit = await dispatch(editme({user_id: user.data._id ,userdata: userData}))
    if (!edit.error) window.location.reload()
  }

  if (isLoading) return <Spinner />

  return (
    <div className='overflow-auto'>
      <section className='heading'>
        <h1>
          Hello {user && user.data.name}
        </h1>
        Change Password:
      </section>
      
      <section className='form'>
        <form onSubmit={onSubmit}>
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
            <button type='submit' className='btn btn-primary btn-lg'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Settings