const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const createError = require("http-errors");
const { createUser, signalUser, deletedUser, updatedUser, getAllUser } = require("../service/userService");



const handelGetAllUsers = async (req, res, next) => {
    try {
        // Get query parameters for search, pagination
        const { page = 1, limit = 10, search = "" } = req.query;

        // Convert to numbers
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        const [users, totalCount] = await getAllUser(search, pageNum, limitNum)

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
            pagination: {
                totalCount,
                currentPage: pageNum,
                totalPages: Math.ceil(totalCount / limitNum),
                limit: limitNum,
            },
        });
    } catch (error) {
        next(error);
    }
};


const handleUserCreate = async (req, res, next) => {
    try {

        const { username, email, password } = req.body;


        const newUser = await createUser(username, email, password);

        // Respond with the created user (excluding sensitive data like password)
        res.status(201).json({
            success: true,
            message: "User created successfully.",
            data: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                createdAt: newUser.createdAt,
            },
        });

    } catch (error) {
        // Pass errors to the global error handler
        next(error);
    }
};

const handleSignalUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const user = await signalUser(userId)

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user
        });

    } catch (error) {


        next(error);
    }
};

const handelDeleteUser = async (req, res, next) => {
    try {

        const userId = req.params.id
        await signalUser(userId)

        const user = await deletedUser(userId)

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user
        })

    } catch (error) {
        next(error)
    }
}


const handelUpdateUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        const { username, password } = req.body
        await signalUser(userId)

        const user = await updatedUser(req, userId, username, password)

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user
        })

    } catch (error) {
        next(error)
    }
}



module.exports = {
    handleUserCreate,
    handleSignalUser,
    handelDeleteUser,
    handelUpdateUser,
    handelGetAllUsers
};
