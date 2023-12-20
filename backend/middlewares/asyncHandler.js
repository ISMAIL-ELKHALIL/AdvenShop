// Async middleware handler to wrap asynchronous route handlers
const asyncHandler = (fn) => (req, res, next) => {
  // Wrap the asynchronous function in a Promise to handle asynchronous operations
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Export the asyncHandler function as the default export for use in other parts of the application
export default asyncHandler;

/*
? asyncHandler Function:
const asyncHandler = (fn) => (req, res, next) => { ... }: 

This function is a higher-order function that takes an asynchronous function (fn) as an argument and returns a new function.

? Asynchronous Function Wrapping:

Promise.resolve(fn(req, res, next)):

The provided asynchronous function (fn) is wrapped in Promise.resolve(). This ensures that the asynchronous function is always returned as a Promise.

? Error Handling:

.catch(next): The catch method is used to catch any errors that might occur during the execution of the asynchronous function. If an error occurs, it will be passed to the Express next function, which is used to pass control to the next middleware or route handler. */
