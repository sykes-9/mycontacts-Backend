// Import the asyncHandler utility for handling asynchronous operations in middleware
const asyncHandler = require('express-async-handler');
// Import the jsonwebtoken library for working with JSON Web Tokens (JWT)
const jwt = require("jsonwebtoken");

// Middleware function to validate and decode JWT token in the request header
const validateToken = asyncHandler(async (req, res, next) => {
    // Initialize a variable to store the token
    let token;
    // Retrieve the Authorization header from the request
    let authHeader = req.headers.Authorization || req.headers.authorization;

    // Check if the Authorization header is present and starts with "Bearer"
    if (authHeader && authHeader.startsWith("Bearer")) {
        // Extract the token from the "Bearer" token format
        token = authHeader.split(" ")[1];

        // Verify the token using the ACCESS_TOKEN_SECRET and decode the user information
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            // If there is an error during verification, respond with a 401 Unauthorized status
            if (err) {
                res.status(401);
                throw new Error('User is not authorized');
            }
            // Set the decoded user information in the request object
            req.user = decoded.user;
            // Move to the next middleware or route handler
            next();
        });

        // If there is no token, respond with a 401 Unauthorized status and an error message
        if (!token) {
            res.status(401);
            throw new Error('User is not authorized or token is missing');
        }
    }
});

// Export the validateToken middleware for use in other parts of the application
module.exports = validateToken;
