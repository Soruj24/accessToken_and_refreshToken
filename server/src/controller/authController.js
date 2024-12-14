const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { jwt_refresh_secret_key, jwt_access_secret_key } = require("../secret");
const { setAccessCookie, setRefreshToken } = require("../helper/cookie");
const { createJSONWebToken } = require("../helper/createJsonWebToken");
const { loginUser } = require("../service/authService");

const handelLoginUser = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        // login user function 
        const [accessToken, refreshToken, user] = await loginUser(email, password);

        // accessToke and refreshToken set the cookie 
        setAccessCookie(res, accessToken)
        setRefreshToken(res, refreshToken)

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                id: user._id,
                accessToken,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                isAdmin: user.isAdmin,
                isBanned: user.isBanned,
                refreshToken
            },
        });
    } catch (error) {
        next(error); // Pass the error to the global error handler
    }
};


const handelRefreshToken = async (req, res, next) => {
    try {

        const oldRefreshToken = req.cookies.refreshToken;
        if (!oldRefreshToken) {
            return res.status(401).json({
                message: "Refresh token not found"
            })
        }

        const decoded = jwt.verify(oldRefreshToken, jwt_refresh_secret_key);

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid refresh token"
            })
        }
        console.log("decoded", decoded)

        const accessToken = createJSONWebToken({ user: decoded.user },
            jwt_access_secret_key,
            "15m")

        setAccessCookie(res, accessToken)


        return res.status(201).json({
            success: true,
            message: "Access token refreshed successfully",
            accessToken
        })


    } catch (error) {
        next(error)
    }
}



const handelProtected = async (req, res, next) => {
    try {

        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({
                message: "Access token not found"
            })
        }

        const decoded = jwt.verify(accessToken, jwt_access_secret_key);

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid access token"
            })
        }

        const user = await User.find({})

        return res.status(201).json({
            success: true,
            message: "Protected route accessed successfully",
            user
        })

    } catch (error) {
        next(error)
    }
}

const handelLogOut = async (req, res, next) => {
    try {

        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")


        return res.status(201).json({
            success: true,
            message: "User logged out successfully",

        })

    } catch (error) {
        next(error)
    }
}


module.exports = {
    handelLoginUser,
    handelLogOut,
    handelRefreshToken,
    handelProtected,
};
