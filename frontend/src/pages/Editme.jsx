import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteaccount, editme , reset } from '../features/auth/authSlice'
import {useSelector, useDispatch} from 'react-redux'
import { toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Editme() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  })
  
  const { name, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isAuthorized, isLoading, isError, message} = useSelector(
    (state) => state.auth)
  
  
  useEffect(() =>{
    // if (isError){
    //   toast.error(message)
    // }

    if (!user) navigate('/')
    
    
    // if (!isAuthorized || !user){
    //   navigate('/')
    // }
    
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
      name,
      password,
    }

    const edit = await dispatch(editme({user_id: user.data._id ,userdata: userData}))
    if (!edit.error) navigate('/')
      
    
  }

  return (
    <>
      <section className='heading'>
        <h1>
          Hello {user && user.data.name}
        </h1>
        <p>Edit ur profile below</p>
      </section>
      
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
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

export default Editme