//automatically remove referencing objects
const asyncHandler = require('express-async-handler')
const Reviews = require("../models/reviewmodels")
const Recipes = require("../models/recipemodels")

const removereviews = asyncHandler(async(req, res, next) => {
  const recipe = await Recipes.findById(req.params.recipe_id)

  if (!recipe){
    res.status(400)
    throw new Error("No recipe")
  }

  await Reviews.deleteMany({recipe: recipe._id.toString()});
  next()
})

module.exports = {
  removereviews
}