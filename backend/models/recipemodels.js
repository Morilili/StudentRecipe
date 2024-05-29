const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    require: true 
  },
  images: [],
  ingrediants: [],
  directions: [],
  
  // the following way is probably not the best practice as using a model for likes statistics should be more efficient?
  likes: [], // list of people who liked
  dislikes: [], // list of people who disliked
  dateCreated: {
    type: Date,
    default: () => Date.now() + 7*24*60*60*1000
  },
  },
  {timestamps: true},
)

module.exports = mongoose.model('Recipe', recipeSchema)