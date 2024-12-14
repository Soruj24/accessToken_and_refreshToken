const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            trim: true, // Removes extra whitespace
            minlength: [3, 'Username must be at least 3 characters long'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true, // Ensure emails are unique
            trim: true,
            match: [
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                'Please provide a valid email address',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        isAdmin: {
            type: Boolean,
            default: false, // Default value if not provided
        },

        isBanned: {
            type: Boolean,
            default: false, // Default value if not provided
        },

    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
