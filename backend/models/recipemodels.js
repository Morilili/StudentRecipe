const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    require: true 
  },
  images: [],
  ingrediants: [],
  directions: [],
  dateCreated: {
    type: Date,
    default: () => Date.now() + 7*24*60*60*1000
  },
  },
  {timestamps: true},
)

module.exports = mongoose.model('Recipe', recipeSchema)