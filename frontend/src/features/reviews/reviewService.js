import axios from 'axios'

const API_URL = '/api/reviews/'

const getReviews = async(recipe_id, index) => {
  const response = await axios.get(API_URL + recipe_id + `?offset=${index * 6}&limit=6`)
  
  // sorting response in reverse chronological order
  // response.data.data.sort(function(a,b) {
  //   return new Date(b.dateCreated) - new Date(a.dateCreated)
  // })
  
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
  getReviews,
  postReview,
  deleteReview,
}

export default reviewService