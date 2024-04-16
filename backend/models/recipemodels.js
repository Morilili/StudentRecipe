const mongoose = require('mongoose')

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    require: true 
  },
  recipe_pic_type: [{
    type: String,
    allowNull: true,  
    defaultValue: undefined
  }],
  recipe_pic_data: [{
    type: Buffer,
    allowNull: true,
    defaultValue: undefined,
  }],
  img:
    {
        data: Buffer,
        contentType: String
    },
  ingrediants: [],
  directions: [],
  likes: { 
    type: Number,
    default: 0
  },
  dateCreated: {
    type: Date,
    default: () => Date.now() + 7*24*60*60*1000
  },
  },
  {timestamps: true},
)

module.exports = mongoose.model('Recipe', recipeSchema)