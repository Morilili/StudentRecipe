import axios from 'axios'

const API_URL = '/api/recipes/'

const getRecipes = async(params, index) => {
  var url = API_URL + '?'
  if (params.length != 0){
    const paramsString = params.join(',')
    url += `subset=${paramsString}`
  }
  
  url += `&offset=${index}0&limit=10`
  const response = await axios.get(url)
  return response.data
}

const getSingleRecipe = async(recipe_id) => {
  const response = await axios.get(API_URL + recipe_id)
  return response.data
}

const getLikeStatus = async(recipe_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + recipe_id + '/recipelikestatus', config)
  return response.data
}

const updateLikeStatus = async(recipe_id, action, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL + recipe_id + '/recipelikestatus', {action: action}, config)
  return response.data
}

const getSaveRecipe = async(recipe_id ,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
 
  const response = await axios.get(API_URL + recipe_id + '/save', config)
  return response.data
}

const createRecipe = async(recipedata, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  
  const response = await axios.post(API_URL, recipedata, config)
  return response.data
}

const saveRecipe = async(recipe_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  
  const response = await axios.post(API_URL + recipe_id + '/save', {}, config)
  return response.data
}

const deleteRecipe = async(recipe_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + recipe_id, config)
  return response.data
}

const recipeService = {
  getRecipes,
  getSingleRecipe,
  getLikeStatus,
  updateLikeStatus,
  getSaveRecipe,
  saveRecipe,
  createRecipe, 
  deleteRecipe
}

export default recipeService  
