const express = require('express')
const asyncHandler = require('express-async-handler')
const Recipe = require("../models/recipemodels");
const recipemodels = require('../models/recipemodels');

//@desc Getting all recipes
//@route GET api/recipes
const getAllRecipes = asyncHandler(async (req, res) => {
  //finding all

  //for selecting certain fields of the query
  // const recipes = await Recipe.find({}, 'name ').exec() 
  
  const recipes = await Recipe.find();
  res.status(200).json(recipes)
})

//@desc Getting one recipe
//@route GET api/recipes/:recipe_id
const getSingleRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipe_id)

  if (!recipe){
    res.status(400)
    throw new Error('Recipe not found')
  }
  res.status(200).json(recipe)
})



//@desc Create a new recipe
//@route POST api/recipes/
const createNewRecipe = asyncHandler(async (req, res) => {
  const { name, ingrediants, directions } = req.body
  const recipe_pic_type = [] //req.files.mimetype  //string 
  const recipe_pic_data = [] //req.files.buffer // array buffer
  
  // console.log(req.files.length)
  // iterator function to retrieve all image type and data
  let i = 0;
  while(i != req.files.length){
    recipe_pic_type.push(req.files[i].mimetype)
    recipe_pic_data.push(req.files[i].buffer)
    i++
  }

  if (!name || !ingrediants || !directions){
    res.status(400)
    throw new Error("Please provide all details")
  }

  const newRecipe = await Recipe.create({
    name, 
    ingrediants, 
    directions, 
    recipe_pic_type: recipe_pic_type ? recipe_pic_type : undefined, 
    recipe_pic_data: recipe_pic_data ? recipe_pic_data : undefined
  })
  
  res.status(201).json({message: "Successfully posted recipe"})
})

//@desc Updating a single recipe detail
//@route PUT api/recipes/:recipe_id
const updateRecipe = asyncHandler(async (req, res) => {
  const { name, ingrediants, directions } = req.body
  const recipe_pic_type = [] //req.files.mimetype  //string 
  const recipe_pic_data = [] //req.files.buffer // array buffer
  
  // console.log(req.files.length)
  // iterator function to retrieve all image type and data
  let i = 0;
  if (req.files){
    while(i != req.files.length){
      recipe_pic_type.push(req.files[i].mimetype)
      recipe_pic_data.push(req.files[i].buffer)
      i++
    }
  }
  
  const recipe = await Recipe.findById(req.params.recipe_id)

  if (!recipe){
    res.status(400)
    throw new Error('Recipe not found')
  }
  
  if (name) recipe.name = name;
  if (ingrediants) recipe.ingrediants = ingrediants;
  if (directions) recipe.directions = directions;
  if (recipe_pic_type) recipe.recipe_pic_type = recipe.recipe_pic_type.concat(recipe_pic_type);
  if (recipe_pic_data) recipe.recipe_pic_data = recipe.recipe_pic_data.concat(recipe_pic_data);

  await recipe.save();

  res.status(200).json({message: "Updated successfully"})
})

//@desc Updating the likes of a recipe
//@route PUT api/recipes/:recipe_id/like
const likeRecipe = asyncHandler(async(req,res) => {
  const recipe = await Recipe.findById(req.params.recipe_id)
  const user = req.user.id
  
  if (!recipe){
    res.status(400)
    throw new Error('Recipe not found')
  }
  
  if (!(recipe.dislikes.indexOf(user))){
    res.status(400)
    throw new Error("Disliked already")
    

  } else if (recipe.likes.indexOf(user)) { //making sure user does not like and dislike at the same time
    recipe.likes.push(user)
    res.status(200).json({message: "Liked"})
  } else {
    const index = recipe.likes.indexOf(user)
    recipe.likes.splice(index)
    res.status(200).json({message: "Unliked"})
  }
  
  await recipe.save()
})

//@desc Updating the dislikes of a recipe
//@route PUT api/recipes/:recipe_id/dislike
const dislikeRecipe = asyncHandler(async(req,res) => {
  const recipe = await Recipe.findById(req.params.recipe_id)
  const user = req.user.id
  
  
  if (!recipe){
    res.status(400)
    throw new Error('Recipe not found')
  }
  
  if (!(recipe.likes.indexOf(user))){
    res.status(400)
    throw new Error("Liked already")

  } else if (recipe.dislikes.indexOf(user)) { //making sure user does not like and dislike at the same time
    recipe.dislikes.push(user)
    res.status(200).json({message: "Disliked"})
  } else {
    const index = recipe.dislikes.indexOf(user)
    recipe.dislikes.splice(index)
    res.status(200).json({message: "Undisliked"})
  }
  
  await recipe.save()
})

//@desc Delete a single recipe
//@route DELETE api/recipes/:recipe_id
const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipe_id)

  if (!recipe){
    res.status(401)
    throw new Error("Recipe not found")
  } else {
    const deletedrecipe = await Recipe.findByIdAndDelete(req.params.recipe_id)
    res.status(200).json({success: true, message: `Successfully deleted recipe`})
  }
})

//@TODO: delete single image? when updating a recipe
//
//now can only append to exisitng images, can be easily changed to replace all
//will be seeing how updating works later for now like this. 
//

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
