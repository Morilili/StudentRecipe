const mongoose = require('mongoose')

const reviewmodel = mongoose.Schema({
  recipe: {type: mongoose.Schema.ObjectId, ref:"Recipe"},
  body: String,
  postedBy: {type: mongoose.Schema.ObjectId, ref:'Users'},
  likes: Number,
  dateCreated: Date,
  },
  {timestamps: true},
)

module.exports = mongoose.model("Review", reviewmodel)

