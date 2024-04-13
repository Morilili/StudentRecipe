const express = require('express')
const asyncHandler = require('express-async-handler')
const Recipe = require("../models/recipemodels")


//@desc Getting all recipes
//@route GET api/recipes
const getAllRecipes = asyncHandler(async (req, res) => {
  res.status(200).json({message: "getall succe"});
})

//@desc Getting one recipe
//@route GET api/recipes/:recipe_id
const getSingleRecipe = asyncHandler(async (req, res) => {
  res.status(200).json({message: "get single Suc"});
})

//@desc Create a new recipe
//@route POST api/recipes/
const createNewRecipe = asyncHandler(async (req, res) => {
  res.status(200).json({message: "created recipe"});
})

//@desc Updating a single recipe detail
//@route PUT api/recipes/:recipe_id
const updateRecipe = asyncHandler(async (req, res) => {
  res.status(200).json({message: "update suc"});
})

//@desc Delete a single recipe
//@route DELETE api/recipes/:recipe_id
const deleteRecipe = asyncHandler(async (req, res) => {
  res.status(200).json({message: "delete suc"});
})

module.exports = {
  getAllRecipes,
  getSingleRecipe,
  createNewRecipe,
  updateRecipe,
  deleteRecipe
}
