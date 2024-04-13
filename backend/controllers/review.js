const express = require('express')
const asyncHandler = require('express-async-handler')
const Review = require('../models/reviewmodels')

//@desc Getting the reviews for the particualar recipe
//@route GET api/reviews
const getReviews = asyncHandler(async (req, res) => {
  res.status(200).json({message: "get suced"})
})

//@desc Posting a review for the particualar recipe
//@route POST api/reviews
const postReview = asyncHandler(async (req, res) => {
  res.status(200).json({message: "post suced"})
})

//@desc Delete a review
//@route DELETE api/reviews/:recipe_id
const deleteReview = asyncHandler(async (req, res) => {
  res.status(200).json({message: "get suced"})
})

module.exports = {
  getReviews,
  postReview,
  deleteReview,
}