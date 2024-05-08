import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteaccount, editme , logout,reset } from '../features/auth/authSlice'
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
    if (isError){
      toast.error(message)
    }

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

  const onSubmit = (e) => {
    e.preventDefault()
  
    const userData = {
      name,
      password,
    }
    dispatch(editme({user_id: user.data._id ,userdata: userData}))
    // navigate('/')
  }


  // functions for deleting a user
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteAccount = (e) =>{
    console.log(user.data._id)
    dispatch(deleteaccount(user.data._id))
    closeModal();
    navigate('/')
  }

  return (
    <>
      <section className='heading'>
        <h1>
          Edit
        </h1>
        <p>Edit ur profile lmao</p>
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
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
      
      <section>
        <button onClick={openModal}>Delete Account</button>
        
        {isOpen && (
          <div>
            <div class="overlay" onClick={() =>{}} style={{position:"absolute",backgroundColor:"rgba(255, 255, 255, 0.5)", top: 0, left: 0,width: "100%",height: "100%",zIndex: 1}}></div>
            <dialog style={{zIndex:2} }open>
              <h2>DELETE ACCOUNT</h2>
              <p>Are you sure you want to delete your account?</p>
              <button onClick={deleteAccount}> Confirm </button>
              <button onClick={closeModal}>Close</button>
            </dialog>
          </div>
        )}
      </section>
      
    </>
  )
}

export default Editme