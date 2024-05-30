import axios from 'axios'

const API_URL = '/api/recipes/'

const getRecipes = async() => {
  const response = await axios.get(API_URL)
  return response.data
}

const getSingleRecipe = async(recipe_id) => {
  const response = await axios.get(API_URL + recipe_id)
  return response.data
}

const recipeService = {
  getRecipes,
  getSingleRecipe
}

export default recipeService  
