const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const { default: mongoose } = require("mongoose");


const getAllUser = async (search, pageNum, limitNum) => {
    try {

        // Search condition
        const searchCondition = search
            ? {
                $or: [
                    { username: { $regex: search, $options: "i" } }, // Case-insensitive search
                    { email: { $regex: search, $options: "i" } },
                ],
            }
            : {};

        // Get the total count of users that match the search
        const totalCount = await User.countDocuments(searchCondition);

        // Fetch users with pagination and search condition
        const users = await User.find(searchCondition)
            .skip((pageNum - 1) * limitNum) // Skip the number of items for the current page
            .limit(limitNum) // Limit the number of items per page
            .sort({ createdAt: -1 }); // Optional: Sort by creation date (descending)

        return [users, totalCount]

    } catch (error) {
        throw error
    }
}

const createUser = async (username, email, password) => {
    try {

        // Check if user with the same email already exists
        const user = await User.findOne({ email });
        if (user) {
            throw createError.Conflict("User with this email already exists");
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create the user in the database
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword, // Store the hashed password
        });

        return newUser;


    } catch (error) {
        throw error
    }
}

const signalUser = async (userId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw createError.NotFound("Invalid User ID");
        }

        const user = await User.findById(userId);
        if (!user) {
            throw createError.NotFound("User not found");
        }
        return user;
    } catch (error) {
        throw error
    }
}

const deletedUser = async (userId) => {
    try {


        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw createError.NotFound("User not found");
        }
        return user;


    } catch (error) {
        throw error
    }
}



const updatedUser = async (req, userId) => {
    try {
        const updateOptions = { new: true, runValidation: true, context: 'query' };

        let updates = {}
        for (let key in req.body) {
            if (["username", "password",].includes(key)) {
                updates[key] = req.body[key]
            } else if (["email"].includes(key)) {
                throw createError(400, "You can't update email")
            }
        }

        const user = await User.findByIdAndUpdate(userId, updates, updateOptions)
        if (!user) throw createError(404, "User with this id not found");

        return user
    } catch (error) {
        throw error
    }
}


module.exports = {
    createUser,
    signalUser,
    deletedUser,
    updatedUser,
    getAllUser

}