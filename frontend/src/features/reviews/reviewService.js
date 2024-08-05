import axios from 'axios'

const API_URL = 'https://student-recipe-morris-backend.vercel.app/api/reviews/'

const getCount = async() => {
  const response = await axios.get(API_URL + 'count')
  return response.data
}

const getReviews = async(recipe_id, index, count) => {
  const offset = (count - ((index + 1) * 6)) > 0 ? (count - ((index + 1) * 6)) : 0
  const limit = 6 + (count - ((index + 1) * 6))

  //almost hacking the solution here
  var response
  if (count<6){
    response = await axios.get(API_URL + recipe_id + `?offset=0&limit=${limit}`)
  } else if (offset != 0) {
    response = await axios.get(API_URL + recipe_id + `?offset=${offset}&limit=6`)
  } else {
    response = await axios.get(API_URL + recipe_id + `?offset=0&limit=${limit}`) 
  }
  
  // sorting response in reverse chronological order
  response.data.data.sort(function(a,b) {
    return new Date(b.dateCreated) - new Date(a.dateCreated)
  })
  
  return response.data
}

const getnumReviews = async(recipe_id) => {
  const response = await axios.get( API_URL + recipe_id + '/num')

  return response.data
}
const postReview = async(data, recipe_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL + recipe_id, data, config)
  return response.data
}

const deleteReview = async(review_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }
  const response = await axios.delete(API_URL + review_id, config)
  return response.data
}

const reviewService = {
  getCount,
  getReviews,
  getnumReviews,
  postReview,
  deleteReview,
}

export default reviewService