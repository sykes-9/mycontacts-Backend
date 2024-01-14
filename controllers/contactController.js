const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    // Fetch all contacts belonging to the authenticated user
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

//@desc Create a new contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    console.log('the request body is:', req.body);
    const { name, email, phone } = req.body;
    // Validate required fields
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    // Create a new contact associated with the authenticated user
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@desc Get a specific contact by ID
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    // Check if the contact exists
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found!");
    }
    res.status(200).json(contact);
});

//@desc Update a contact by ID
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    // Check if the contact exists
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found!");
    }
    // Check if the contact belongs to the authenticated user
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('You can only edit your own contacts!');
    }
    // Update the contact
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
});

//@desc Delete a contact by ID
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    // Check if the contact exists
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    // Check if the contact belongs to the authenticated user
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('You can only delete your own contacts!');
    }
    // Delete the contact
    await contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};
