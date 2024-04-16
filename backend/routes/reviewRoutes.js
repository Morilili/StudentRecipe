const express = require('express')
const reviewRouter = express.Router()

// Load middleware

// Load controller
const { getReviews, postReview, deleteReview} = require("../controllers/review")

reviewRouter.route('/:review_id').delete(deleteReview)
reviewRouter.route('/:recipe_id').get(getReviews).post(postReview)

module.exports = reviewRouter