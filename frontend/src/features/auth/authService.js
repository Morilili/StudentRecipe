import axios from 'axios'

const API_URL = '/api/users/'

//register user
const register = async(userData) =>{
  const response = await axios.post(API_URL, userData)

  if (response.data){
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

//login user
const login = async(userData) =>{
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data){
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const logout = async() => {
  const response = await axios.post(API_URL + 'logout')
  
  if(response) localStorage.removeItem('user')
  
  return response.data
}

const editme = async(user_id, userdata, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL + 'edit/' + user_id, userdata, config)
  return response.data
}

const deleteaccount = async(user_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + user_id, config)
  if(response) localStorage.removeItem('user')
  return response.data
}

const authService = {
  register,
  logout,
  login,
  editme,
  deleteaccount
}

export default authService
