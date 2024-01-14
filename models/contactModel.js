// Import the mongoose library for defining schemas and models
const mongoose = require('mongoose');

// Define the schema for the 'contacts' collection in MongoDB
const contactSchema = mongoose.Schema({
    // Define a field 'user_id' as a reference to the 'User' model with ObjectId type
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Reference to the 'User' model
    },
    // Define a field 'name' as a required String for the contact name
    name: {
        type: String,
        required: [true, "Please add the contact name"],
    },
    // Define a field 'email' as a required String for the contact email address
    email: {
        type: String,
        required: [true, "Please add the contact email address"],
    },
    // Define a field 'phone' as a required String for the contact phone number
    phone: {
        type: String,
        required: [true, "Please add the contact phone number"],
    },
}, {
    // Enable timestamps for automatic createdAt and updatedAt fields
    timestamps: true,
});

// Export the Mongoose model for the 'Contact' schema
module.exports = mongoose.model('Contact', contactSchema);
