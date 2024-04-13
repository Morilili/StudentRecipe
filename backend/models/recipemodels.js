const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    require: true 
  },
  img:
  {
    data: Buffer,
    contentType: String
  },
  ingrediants: [],
  directions: [],
  likes: Number,
  dateCreated: Date,
  },
  {timestamps: true},
)

module.exports = mongoose.model('Recipe', recipeSchema)