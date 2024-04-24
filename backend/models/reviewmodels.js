const mongoose = require('mongoose')

const reviewmodel = mongoose.Schema({
  recipe: {type: mongoose.Schema.ObjectId, ref:"Recipe"},
  body_text: String,
  postedBy: {type: mongoose.Schema.ObjectId, ref:'Users'},
  dateCreated: {
    type: Date,
    default: () => Date.now() + 7*24*60*60*1000
  },
  },
  // {timestamps: true},
)

module.exports = mongoose.model("Review", reviewmodel)

