// Import required modules
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    // Destructure request body
    const { username, email, password } = req.body;

    // Check if required fields are provided
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    // Check if the user is already registered
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    // Hash the password before saving it into the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    // Respond with the created user data
    if (user) {
        res.status(201).json({ _id: user._id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({ message: "Register the user" });
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    // Destructure request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide an email and a password");
    }

    // Find the user in the database
    const user = await User.findOne({ email });

    // Compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        // Create an access token using JWT
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    id: user._id,
                    email: user.email,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error('Email or password is not valid');
    }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

// Export the functions for use in other files
module.exports = { registerUser, loginUser, currentUser };
