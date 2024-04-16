const express = require("express")
const multer = require("multer")
const upload = multer()

const recipeRouter = express.Router()

// Load middleware

// Load controllers
const { getAllRecipes, getSingleRecipe, createNewRecipe, updateRecipe, deleteRecipe} = require("../controllers/recipe")

recipeRouter.route('/').get(getAllRecipes).post(upload.any('image'), createNewRecipe)
recipeRouter.route('/:recipe_id').get(getSingleRecipe).put(upload.any('image'), updateRecipe).delete(deleteRecipe)

module.exports = recipeRouter

