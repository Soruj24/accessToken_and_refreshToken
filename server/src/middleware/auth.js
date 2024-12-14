const { jwt_access_secret_key } = require("../secret");
const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");

const isLoggedIn = (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            throw createHttpError(401, " Please Login first")
        }
        const decoded = jwt.verify(token, jwt_access_secret_key);

        if (!decoded) {
            throw createHttpError(401, "user not verified")
        }

        //! isAdmin Check 
        req.user = decoded.userExists
        next();

    } catch (error) {
        console.log("error loggedIn", error)
        next(error)
    }
}

const isLoggedOut = (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (token) {
            try {
                const decoded = jwt.verify(token, jwt_access_secret_key);
                if (decoded) {
                    throw createHttpError(400, "User is already logged in.")
                }
            } catch (error) {
                console.log("error", error)
                next(error)
            }
        }

        next();

    } catch (error) {
        next(error)
    }
}


const isAdmin = (req, res, next) => {
    try {
        if (!req?.user?.isAdmin) {
            throw createHttpError(403, "You are not an admin")
        }
        next();

    } catch (error) {
        next(error)
    }
}


module.exports = { isLoggedIn, isLoggedOut, isAdmin }