const express = require('express')
const reviewRouter = express.Router()

// Load middleware
const { userprotect } = require("../middleware/auth")
// Load controller
const { getReviews, postReview, deleteReview} = require("../controllers/review")

reviewRouter.route('/:review_id').delete(userprotect, deleteReview)
reviewRouter.route('/:recipe_id').get(getReviews).post(userprotect, postReview)

module.exports = reviewRouter