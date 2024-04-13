const express = require('express')
const reviewRouter = express.Router()

// Load middleware

// Load controller
const { getReviews, postReview, deleteReview} = require("../controllers/review")

reviewRouter.route('/').get(getReviews).post(postReview)
reviewRouter.delete('/:review_id', deleteReview)

module.exports = reviewRouter