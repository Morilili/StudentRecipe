const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'please add a name']
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true 
  },
  role:{
    type: String,
    default: "User"
  },
  saved: [{
    type: mongoose.Schema.ObjectId, ref:"Recipe"
  }],
  },
  {
    timestamps: true
  },
)

module.exports = mongoose.model('Users', userSchema)