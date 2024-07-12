//automatically remove referencing objects
const asyncHandler = require('express-async-handler')
const Reviews = require("../models/reviewmodels")
const Recipes = require("../models/recipemodels")
const Recipelike = require("../models/recipelikemodels")
const Users = require("../models/usermodels")

// Deletes like and comments when Admin deletes a recipe
const removeRecipe = asyncHandler(async(req, res, next) => {
  const recipe = await Recipes.findById(req.params.recipe_id)

  if (!recipe){
    res.status(400)
    throw new Error("No recipe")
  }

  await Reviews.deleteMany({recipe: recipe._id});
  await Recipelike.deleteMany({recipe_id: recipe._id})

  next()
})

// Deletes a users a comment or likes from mongodb when they delete their account
const removeUser = asyncHandler(async(req, res, next) => {
  const user = await Users.findById(req.params.id);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  await Recipelike.deleteMany({user_id: user._id})
  await Reviews.deleteMany({ postedBy: user._id });

  next();
});

module.exports = {
  removeRecipe,
  removeUser
}