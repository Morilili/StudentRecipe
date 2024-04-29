// const errorHandler = (err, req, res, next) => {
//   const statusCode = res.statusCode ? res.statusCode : 500;

//   res.status = statusCode;

//   res.json({
//     message: err.message,
//     stack: process.env.NODE_ENV === "production" ? null : err.stack,
//   });
// }

// better implementation of error handler as I am advised not to throw errors in expressjs
const errorHandler = (err, req, res, next) => {
  // log the error; normally I'd use debug.js or similar, but for simplicity just console in this example
  console.error(err);

  // Check to see if we have already defined the status code
  if (err.statusCode){
    // In production, you'd want to make sure that err.message is 'safe' for users to see, or else use a different value there
    return res.status(err.statusCode).json({ message: err.message }); 
  }
  return res.status(500).json({ message: 'An error has occurred, please contact the system administrator if it continues.' });
};

module.exports = { 
  errorHandler,
};