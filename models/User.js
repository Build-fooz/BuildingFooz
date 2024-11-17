const mongoose = require('mongoose');

// Schema definition for storing user details in the database
const UserSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: true, 
        unique: true, 
    },
    email: {
        type: String, 
        required: true, 
        unique: true, 
    },
    password: {
        type: String, 
        required: true, 
        unique: true, 
    },
    role: {
        type: String, // Role of the user (e.g., admin, user)
        default: 'user', // Default role is 'user'
    },
});

// Create and export the User model for use in authentication and user-related operations
const User = mongoose.model('User', UserSchema);
module.exports = User;
