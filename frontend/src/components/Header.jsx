import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteaccount, logout, reset} from "../features/auth/authSlice"
import { useState, useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { toast } from 'react-toastify'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isAuthorized, isLoading, isError, message} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  useEffect(() =>{
    if (isError){
      toast.error(message)
    }
    dispatch(reset())
  }, [user, isAuthorized, isError, message, navigate, dispatch]);

  // functions for deleting a user
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteAccount = (e) =>{
    dispatch(deleteaccount(user.data._id))
    closeModal();
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

            {isOpen && (
                    <div>
                      <div className="overlay" onClick={() =>{}} style={{position:"absolute",backgroundColor:"rgba(255, 255, 255, 0.5)", top: 0, left: 0,width: "100%",height: "100%",zIndex: 1}}></div>
                      <dialog style={{zIndex:2} }open>
                        <h2>DELETE ACCOUNT</h2>
                        <p>Are you sure you want to delete your account?</p>
                        <button onClick={deleteAccount}> Confirm </button>
                        <button onClick={closeModal}>Close</button>
                      </dialog>
                    </div>
            )}
            <DropdownButton id="dropdown-basic-button" title="USER"  style={{zIndex:1}}>
              <Dropdown.Item onClick={() => navigate('/accounts/editme')}>Edit Profile</Dropdown.Item>
              <Dropdown.Item href="/savedrecipes">Saved</Dropdown.Item>
              <Dropdown.Item onClick={openModal}> Delete Account</Dropdown.Item>
            </DropdownButton>
            
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