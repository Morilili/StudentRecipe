const express = require("express")
const multer = require("multer")
const upload = multer()


const recipeRouter = express.Router()

// Load middleware
const { userprotect, adminprotect }= require("../middleware/auth")


// Load controllers
const { getAllRecipes, getSingleRecipe, createNewRecipe, updateRecipe, deleteRecipe, likeRecipe, dislikeRecipe} = require("../controllers/recipe")

recipeRouter.route('/').get(getAllRecipes).post(upload.any('image'), adminprotect, createNewRecipe)
recipeRouter.route('/:recipe_id').get(getSingleRecipe).put(adminprotect, upload.any('image'), updateRecipe).delete(adminprotect, deleteRecipe)
recipeRouter.route('/:recipe_id/like').put(userprotect,likeRecipe)
recipeRouter.route('/:recipe_id/dislike').put(userprotect, dislikeRecipe)

module.exports = recipeRouter

