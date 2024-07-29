const express = require('express')
const asyncHandler = require('express-async-handler')
const Recipe = require("../models/recipemodels");
const User = require("../models/usermodels")
const fs = require('fs');
const path = require('path');
const recipemodels = require('../models/recipemodels');

//@desc Getting all recipes
//@route GET api/recipes
const getAllRecipes = asyncHandler(async (req, res) => {
  const { subset } = req.query
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;
  
  var query = {}
  
  if (subset) {
    const subsetArr = subset.split(',')
    query = { _id: {$in: subsetArr}}
  }
  
  //finding all
  const recipes = await Recipe.find(query).skip(offset)
  .limit(limit)

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
  const { name, ingredients, directions } = req.body
  const recipe_pics = [];
  if (req.files) req.files.forEach((pic) => {recipe_pics.push(pic.filename)})
  

  if (!name || !ingredients || !directions){
    res.status(400).json({message: "Please provide all details"})
    next(new Error("Please provide all details"))
  }
  
  const newRecipe = await Recipe.create({
    name, 
    ingredients, 
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
  if (ingredients) recipe.ingrediants = ingredients;
  if (directions) recipe.directions = directions;
  if (new_images.length > 0) recipe.images = recipe.images.concat(new_images);

  await recipe.save(); 

  res.status(200).json({
    status: "success",
    data: null,
    message: "Updated successfully"
  })
})

//@desc get recipes saved to a user account
//@route get api/recipes/:recipe_id/save
const getSaveRecipe = asyncHandler(async(req,res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(404).json({message: "User not found"});
    return next(new Error("User not found")); // Ensure to return here to stop execution
  }

  res.status(200).json({
    status: "success",
    data: user.saved,
    message: "Get saved recipe successfully"
  })
})

//@desc Save a recipe to a user account when called
//@route POST api/recipes/:recipe_id/save
const saveRecipe = asyncHandler(async(req,res) => {
  const recipe = await Recipe.findById(req.params.recipe_id)
  const user = await User.findById(req.user.id)

  
  if (!recipe){
    res.status(404).json({message: "Recipe not found"})
    next(new Error("Recipe not found"))
  }

  if (!user) {
    res.status(404).json({message: "User not found"});
    return next(new Error("User not found")); // Ensure to return here to stop execution
  }

  // Check if the recipe is already saved
  const isSaved = user.saved.includes(recipe._id);
  
  if (isSaved) {
    // If the recipe is already saved, remove it
    updateuser = await User.findByIdAndUpdate(req.user.id, { $pull: { saved: recipe._id } }, { new: true });
  } else {
    // If the recipe is not saved, add it
    updateuser = await User.findByIdAndUpdate(req.user.id, { $addToSet: { saved: recipe._id } }, { new: true });
  }
  res.status(200).json({
    status: "success",
    data: updateuser.saved,
    message: isSaved ? "Unsaved successfully" : "Saved successfully"
  })
})

// I did what Synk recommended me to do but it still gave Path Traversal Vulnerability when  
// I implement the fix, I will leave it where it is

// Placeholder function for path validation
function isValidPath(imagePath) {
  // Ensure the path does not contain '..' or other invalid sequences
  const invalidPathPattern = /(\.\.[\/\\])/;
  return !invalidPathPattern.test(imagePath);
}

//@desc Delete a single recipe
//@route DELETE api/recipes/:recipe_id
const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipe_id)

  if (!recipe){
    res.status(404).json({message: "Recipe not found"})
    next(new Error("Recipe not found"))
  } else {
    try {
      await Promise.all(recipe.images.map(async (imagePath) => {
        if (!isValidPath(imagePath)) {
          throw new Error("Invalid image path");
        }

        const sanitizedImagePath = path.normalize(imagePath);
        const fullPath = path.join(__dirname, '..', 'uploads', sanitizedImagePath);
        await fs.promises.unlink(fullPath);
      }));

      const deletedRecipe = await Recipe.findByIdAndDelete(req.params.recipe_id);
      res.status(200).json({
        status: "success",
        data: deletedRecipe,
        message: `Successfully deleted recipe ${deletedRecipe.name}`
      });
    } catch (err) {
      console.error("Failed to delete images:", err);
      return next(new Error("Failed to delete images"));
    }
  }
});

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
  getSaveRecipe,
  saveRecipe,
  deleteRecipe,
}
