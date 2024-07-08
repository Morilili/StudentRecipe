const mongoose = require('mongoose');

const recipeLikeSchema = new mongoose.Schema({
  recipe_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['liked', 'disliked', 'neutral']
  }
});

module.exports = mongoose.model('RecipeLike', recipeLikeSchema);