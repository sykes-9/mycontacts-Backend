// Import the express library to create a router
const express = require('express');
// Import user controller methods for handling various user-related endpoints
const { registerUser, currentUser, loginUser } = require('../controllers/userController');
// Import middleware to validate the user's token
const validateToken = require('../middleware/validateTokenHandler');

// Create a router instance
const router = express.Router();

// Define routes for user registration, login, and fetching current user information
router.post('/register', registerUser);  // Handle POST requests for user registration
router.post('/login', loginUser);  // Handle POST requests for user login
router.get('/current', validateToken, currentUser);  // Handle GET requests for fetching current user information

// Export the router to be used in other parts of the application
module.exports = router;
