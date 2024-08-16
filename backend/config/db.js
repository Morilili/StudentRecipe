const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(process.env.MONGO_URI);
    const conn = await mongoose.connect("mongodb+srv://Morilili:Morris215215@morriscluster.qk5uxgu.mongodb.net/StudentRecipes?retryWrites=true&w=majority")

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
    process.exit(1);
  }
}  

module.exports = { connectDB };