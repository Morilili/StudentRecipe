const express = require("express")
const recipeRouter = express.Router()

// Load middleware
const { userprotect, adminprotect }= require("../middleware/auth")
const { removereviews } = require("../middleware/remove")

// Load controllers
const { getAllRecipes, getSingleRecipe, createNewRecipe, updateRecipe, saveRecipe, deleteRecipe, getSaveRecipe} = require("../controllers/recipe")
const { getLikeStatus, updateLikeRecipe } = require("../controllers/recipelike")
const { errorHandler } = require("../middleware/error")

// Image processing
const multer = require("multer")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'backend/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null,  uniqueSuffix + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })

recipeRouter.route('/').get(getAllRecipes).post(upload.any("image"), adminprotect, createNewRecipe)
recipeRouter.route('/:recipe_id').get(getSingleRecipe).put(adminprotect, upload.any("image"), updateRecipe).delete(adminprotect, removereviews, deleteRecipe)
recipeRouter.route('/:recipe_id/recipelikestatus').get(userprotect, getLikeStatus).put(userprotect, updateLikeRecipe)
recipeRouter.route('/:recipe_id/save').get(userprotect, getSaveRecipe).post(userprotect, saveRecipe)

module.exports = recipeRouter

