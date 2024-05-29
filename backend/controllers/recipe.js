const express = require('express')
const asyncHandler = require('express-async-handler')
const Recipe = require("../models/recipemodels");
const recipemodels = require('../models/recipemodels');

//@desc Getting all recipes
//@route GET api/recipes
const getAllRecipes = asyncHandler(async (req, res) => {
  //finding all
  const recipes = await Recipe.find()

  res.status(200).json({
    status: "success",
    data:recipes,
    message: "Get all recipes successsful"
  })
})

//@desc Getting one recipe
//@route GET api/recipes/:recipe_id
const getSingleRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipe_id)

  if (!recipe){
    res.status(404).json({message: "Recipe not found"})
    next(new Error("Recipe not found"))
  }
  res.status(200).json({
    status: "success",
    data: recipe,
    message: `Get recipe ${recipe.name} successful`
  })
})

//@desc Create a new recipe
//@route POST api/recipes/
const createNewRecipe = asyncHandler(async (req, res) => {
  const { name, ingrediants, directions } = req.body

  const recipe_pics = [];
  req.files.forEach((pic) => {recipe_pics.push(pic.filename)})

  if (!name || !ingrediants || !directions){
    res.status(400).json({message: "Please provide all details"})
    next(new Error("Please provide all details"))
  }

  const newRecipe = await Recipe.create({
    name, 
    ingrediants, 
    directions, 
    images: recipe_pics
  })
  
  res.status(201).json({
    status: "success",
    data: newRecipe,
    message: "Successfully posted recipe"
  })
})

//@desc Updating a single recipe detail
//@route PUT api/recipes/:recipe_id
const updateRecipe = asyncHandler(async (req, res) => {
  const { name, ingrediants, directions } = req.body
  const new_images = []

  if (req.files) req.files.forEach((pic) => {new_images.push(pic.filename)})
  
  const recipe = await Recipe.findById(req.params.recipe_id)

  if (!recipe){
    res.status(404).json({message: "Recipe not found"})
    next(new Error("Recipe not found"))
  }

  if (name) recipe.name = name;
  if (ingrediants) recipe.ingrediants = ingrediants;
  if (directions) recipe.directions = directions;
  if (new_images.length > 0) recipe.images = recipe.images.concat(new_images);

  await recipe.save(); 

  res.status(200).json({
    status: "success",
    data: null,
    message: "Updated successfully"
  })
})

//@desc Updating the likes of a recipe
//@route PUT api/recipes/:recipe_id/like
const likeRecipe = asyncHandler(async(req,res) => {
  const recipe = await Recipe.findById(req.params.recipe_id)
  const user = req.user.id
  
  if (!recipe){
    res.status(404).json({message: "Recipe not found"})
    next(new Error("Recipe not found"))
  }
  
  if (!(recipe.dislikes.indexOf(user))){
    res.status(400).json({message: "Disliked already"})
    next(new Error("Disliked already"))
    
  } else if (recipe.likes.indexOf(user)) { //making sure user does not like and dislike at the same time
    recipe.likes.push(user)
    res.status(200).json({
      status: "success",
      data: null,
      message: "Liked successfully"
    })
  } else {
    const index = recipe.likes.indexOf(user)
    recipe.likes.splice(index)
    res.status(200).json({
      status: "success",
      data: null,
      message: "Unliked successfully"
    })
  }
  
  await recipe.save()
})

//@desc Updating the dislikes of a recipe
//@route PUT api/recipes/:recipe_id/dislike
const dislikeRecipe = asyncHandler(async(req,res) => {
  const recipe = await Recipe.findById(req.params.recipe_id)
  const user = req.user.id
  
  if (!recipe){
    res.status(404).json({message: "Recipe not found"})
    next(new Error("Recipe not found"))
  }
  
  if (!(recipe.likes.indexOf(user))){
    res.status(400).json({message: "Liked already"})
    next(new Error("Liked already"))

  } else if (recipe.dislikes.indexOf(user)) { //making sure user does not like and dislike at the same time
    res.status(200).json({
      status: "success",
      data: null,
      message: "Disliked successfully"
    })
  } else {
    const index = recipe.dislikes.indexOf(user)
    recipe.dislikes.splice(index)
    res.status(200).json({
      status: "success",
      data: null,
      message: "Undisliked successfully"
    })
  }
  await recipe.save()
})

//@desc Delete a single recipe
//@route DELETE api/recipes/:recipe_id
const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipe_id)

  if (!recipe){
    res.status(404).json({message: "Recipe not found"})
    next(new Error("Recipe not found"))
  } else {
    const deletedrecipe = await Recipe.findByIdAndDelete(req.params.recipe_id)
    res.status(200).json({
      status: "success",
      data:null,
      message: `Successfully deleted recipe ${deletedrecipe.name}`})
  }
})

//@TODO: delete single image? when updating a recipe
//
//now can only append to exisitng images, can be easily changed to replace all
//will be seeing how updating works later for now like this. 
//

module.exports = {
  getAllRecipes,
  getSingleRecipe,
  createNewRecipe,
  updateRecipe,
  likeRecipe,
  dislikeRecipe,
  deleteRecipe,
}
