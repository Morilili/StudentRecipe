import axios from 'axios'

const API_URL = 'https://student-recipe-morris-backend.vercel.app/api/users/'

//Get users
const getUsers = async(role, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      role: role // This will be added as a query parameter to the URL
    },
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

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

  if (!response.data.data.role){
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

//login admin user
const adminLogin = async(userData) =>{
  const response = await axios.post(API_URL + 'login', userData)
  if (response.data.data.role === 'Admin'){
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

//verify if logged in user if admin
const adminVerify = async(token) => { 
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  }
  const response = await axios.get(API_URL + 'adminVerify', config)
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
  
  if (response.data) {
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(response.data))
  }
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

const admindeleteaccount = async(user_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + user_id, config)
  return response.data
}

const authService = {
  getUsers,
  register,
  logout,
  login,
  adminLogin,
  adminVerify,
  editme,
  deleteaccount,
  admindeleteaccount
}

export default authService
