const setAccessCookie = async (res, user) => {
    try {

        res.cookie("accessToken", user, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS
            sameSite: "Strict", // Helps prevent CSRF attacks
            maxAge: 5 * 1000, // Access token expiration (15 minutes)
        });

        return


    } catch (error) {
        throw error
    }
}

setRefreshToken = async (res, user) => {
    try {

        // Optionally store the refresh token in an HTTP-only cookie
        res.cookie("refreshToken", user, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS
            sameSite: "Strict", // Helps prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000, // Refresh token expiration (7 days)
        });
        return

    } catch (error) {
        throw error
    }
}



module.exports = {
    setAccessCookie,
    setRefreshToken
}