const express = require('express')
const asyncHandler = require('express-async-handler')
const RecipeLike = require('../models/recipelikemodels')

//@desc Getting the like status of a post for a user, if this does not exist it creates one entry in the table as neutral
//@route GET api/recipes/:recipe_id/recipelikestatus
const getLikeStatus = asyncHandler(async(req, res, next) => {
  const { recipe_id } = req.params
  const recipelike = await RecipeLike.find({recipe_id: recipe_id, user_id: req.user.id})
  if (recipelike.length === 0){

    const newrecipelike = await RecipeLike.create({
      recipe_id: recipe_id,
      user_id: req.user.id,
      status: "neutral"
    })
  
    res.status(200).json({
      status:"success",
      data: newrecipelike,
      message: "Success initializing like status for particular user and recipe"
    })
  } else {
    res.status(200).json({
      status:"success",
      data: recipelike,
      message: "Success retrieving information"
    })
  }
})


//@desc Update the like status for a particular recipe for a particular user
//@route PUT api/recipes/:recipe_id/recipelikestatus
const updateLikeRecipe = asyncHandler(async(req, res, next) => {
    const { recipe_id } = req.params;
    const { action } = req.body

    
    // Check if the recipe exists in the database
    const recipelike = await RecipeLike.find({recipe_id: recipe_id, user_id: req.user.id})
    

    
    if (recipelike[0].status === "liked" || recipelike[0].status === "disliked"){
      const recipelike = await RecipeLike.findOneAndUpdate(
        {recipe_id: recipe_id, user_id: req.user.id},
        {status: "neutral"}
      )
    } else {
      const recipelike = await RecipeLike.findOneAndUpdate(
        {recipe_id: recipe_id, user_id: req.user.id},
        {status: action}
      )
    }

    res.status(200).json({
      status:"success",
      data: recipelike,
      message: "Success changing like status"
    })
  
});

// Export the controller function
module.exports = {
  updateLikeRecipe,
  getLikeStatus
};