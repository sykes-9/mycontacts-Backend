// Import the mongoose library for defining schemas and models
const mongoose = require('mongoose');

// Define the schema for the 'users' collection in MongoDB
const userSchema = mongoose.Schema({
    // Define a field 'username' as a required String for the user name
    username: {
        type: String,
        required: [true, "Please add the user name"],
    },
    // Define a field 'email' as a required, unique String for the user email address
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"],
    },
    // Define a field 'password' as a required String for the user password
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
}, {
    // Enable timestamps for automatic createdAt and updatedAt fields
    timestamps: true, // Automatically adds createdAt and updatedAt as dates.
});

// Export the Mongoose model for the 'User' schema
module.exports = mongoose.model("User", userSchema);
