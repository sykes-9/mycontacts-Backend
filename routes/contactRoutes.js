// Import the express library to create a router
const express = require('express');
// Create a router instance
const router = express.Router();
// Import the contact controller methods for handling various endpoints
const { 
    getContact, 
    createContact, 
    getContacts, 
    updateContact, 
    deleteContact 
} = require('../controllers/contactController');
// Import middleware to validate the user's token
const validateToken = require('../middleware/validateTokenHandler');

// Apply the validateToken middleware to all routes defined in this router
router.use(validateToken);

// Define routes for handling contacts
router.route('/')
    .get(getContacts)  // Handle GET requests for retrieving all contacts
    .post(createContact);  // Handle POST requests for creating a new contact

router.route('/:id')
    .get(getContact)  // Handle GET requests for retrieving a specific contact by ID
    .put(updateContact)  // Handle PUT requests for updating a specific contact by ID
    .delete(deleteContact);  // Handle DELETE requests for deleting a specific contact by ID

// Export the router to be used in other parts of the application
module.exports = router;
