const express = require('express')
const asyncHandler = require('express-async-handler')
const Review = require('../models/reviewmodels')
const Recipe = require('../models/recipemodels')
const User = require('../models/usermodels')

//@desc Getting the reviews for the particualar recipe
//@route GET api/reviews/:recipe_id
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({recipe: req.params.recipe_id})
  res.status(200).json(reviews)
})

//@desc Posting a review for the particualar recipe
//@route POST api/reviews/:recipe_id
const postReview = asyncHandler(async (req, res) => {
  const { body_text } = req.body

  if(!body_text){
    res.status(400)
    throw new Error("Please enter all review details")
  }
  const review = await Review.create({
    recipe: req.params.recipe_id,
    body_text: body_text,
    postedBy: req.user.id //later for authentication
  })

  res.status(200).json({message: "post suced"})
})

//@desc Delete a review
//@route DELETE api/reviews/:review_id
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.review_id)

  if (!review){
    res.status(400)
    throw new Error("Review not found")
  } else if (review.postedBy != req.user.id) { //ensuring that the user is the one who posted the review
    res.status(401)
    throw new Error("Not Authorized")
  } else {
    const deletedReview = await Review.findByIdAndDelete(req.params.review_id)
    res.status(200).json({message: "Successfully deleted review"})
  }
})

module.exports = {
  getReviews,
  postReview,
  deleteReview,
}