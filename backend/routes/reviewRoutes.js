const express = require('express')
const reviewRouter = express.Router()

// Load middleware
const { userprotect } = require("../middleware/auth")
// Load controller
const { getCount, getReviews, getnumReviews, postReview, deleteReview} = require("../controllers/review")

reviewRouter.route('/count').get(getCount)
reviewRouter.route('/:review_id').delete(userprotect, deleteReview)
reviewRouter.route('/:recipe_id').get(getReviews).post(userprotect, postReview)
reviewRouter.route('/:recipe_id/num').get(getnumReviews)

module.exports = reviewRouter