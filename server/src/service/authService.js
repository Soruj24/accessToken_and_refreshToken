const User = require("../model/userModel");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { createJSONWebToken } = require("../helper/createJsonWebToken");
const { jwt_access_secret_key, jwt_refresh_secret_key } = require("../secret");

const loginUser = async (email, password) => {
    try {

        const user = await User.findOne({ email });

        if (!user) {
            throw createError.NotFound("User not found");
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            throw createError.Unauthorized("Invalid credentials");
        }

        if (user.isBanned) {
            throw createError.Unauthorized("You are banned");
        }

        // Generate access token (valid for 15 minutes)
        const accessToken = createJSONWebToken(
            { user },
            jwt_access_secret_key,
            "15m")

        // Generate refresh token (valid for 7 days)
        const refreshToken = createJSONWebToken(
            { user },
            jwt_refresh_secret_key,
            "7d"
        )

        return [accessToken, refreshToken,user]


    } catch (error) {
        throw error
    }
}

module.exports = {
    loginUser
}