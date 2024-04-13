const express = require("express")
const recipeRouter = express.Router()

// Load middleware

// Load controllers
const { getAllRecipes, getSingleRecipe, createNewRecipe, updateRecipe, deleteRecipe} = require("../controllers/recipe")

recipeRouter.route('/').get(getAllRecipes).post(createNewRecipe)
recipeRouter.route('/:recipe_id').get(getSingleRecipe).put(updateRecipe).delete(deleteRecipe)

module.exports = recipeRouter

