// Middleware for handling 404 Not Found errors
const notFound = (req, res, next) => {
  // Create an error object with a descriptive message including the original URL
  const error = new Error(`Not Found -- ${req.originalUrl}`);

  // Set the HTTP status code to 404
  res.status(404);

  // Pass the error to the next middleware in the stack
  next(error);
};

// Middleware for handling general errors
const errorHandler = (err, req, res, next) => {
  // Determine the HTTP status code based on the response status code or default to 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Set the error message to the provided error message or default to the error's message
  let message = err.message;

  // Check for Mongoose bad Object ID errors
  if (err.name === "CastError" && err.kind === "ObjectId") {
    // Set a specific message and status code for Object ID errors
    message = "Resource not found";
    statusCode = 404;
  }

  // Send the error response with the determined status code and a JSON object
  res.status(statusCode).json({
    message,
    // Include the stack trace in the response for development environments
    stack: process.env.NODE_ENV === "production" ? "📚" : err.stack,
  });
};

// Export the middleware functions for use in other parts of the application
export { errorHandler, notFound };
