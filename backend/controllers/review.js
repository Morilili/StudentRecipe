const express = require('express')
const asyncHandler = require('express-async-handler')
const Review = require('../models/reviewmodels')
const Recipe = require('../models/recipemodels')
const User = require('../models/usermodels')

//@desc Get the number of reviews
//@route GET api/reviews/count
const getCount = asyncHandler(async(req,res) => {
  try {
    const count = await Review.countDocuments();
    res.status(200).json({
      status: "success",
      data: count,
      message: "Get count of reviews successsful"
    })
  } catch (error) {
    console.error('Error fetching the number of reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

//@desc Getting the reviews for the particualar recipe
//@route GET api/reviews/:recipe_id
const getReviews = asyncHandler(async (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;

  const reviews = await Review.find({recipe: req.params.recipe_id}).skip(offset)
  .limit(limit)

  res.status(200).json({
    status: "success",
    data: reviews,
    message: "Get all reviews success"
  })
})

//@desc Getting the number of reviews for the particular recipe
//route GET api/reviews/:recipe_id/num
const getnumReviews = asyncHandler(async(req,res) => {
  const num = await Review.countDocuments({recipe: req.params.recipe_id})

  res.status(200).json({
    status: "success",
    data: num,
    message:"Get number of reviews success"
  })
})

//@desc Posting a review for the particualar recipe
//@route POST api/reviews/:recipe_id
const postReview = asyncHandler(async (req, res, next) => {
  const { body_text } = req.body

  if(!body_text){
    res.status(400).json({message: "Please enter all review details"})
    next(new Error("Please enter all review details"))
  }
  
  const review = await Review.create({
    recipe: req.params.recipe_id,
    body_text: body_text,
    postedBy: req.user.id, //later for authentication
    postedByName: req.user.name
  })

  res.status(200).json({
    status: "success",
    data: {
      body_text: review.body_text,
      postedBy: req.user.id,
      postedByName: req.user.name
    },
    message: "Post succeed"
  })
})

//@desc Delete a review
//@route DELETE api/reviews/:review_id
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.review_id)

  if (!review){
    res.status(400).json({message: "Review not found"})
    next(new Error("Review not found"))
  } else if (review.postedBy != req.user.id) { //ensuring that the user is the one who posted the review
    res.status(401).json({message: "Not Author"})
    next(new Error("Not Author"))
  } else {
    const deletedReview = await Review.findByIdAndDelete(req.params.review_id)
    res.status(200).json({
      status: "success",
      data: null,      
      message: "Successfully deleted review"
    })
  }
})

module.exports = {
  getCount,
  getReviews,
  getnumReviews,
  postReview,
  deleteReview,
}