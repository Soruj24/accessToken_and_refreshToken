const jwt = require('jsonwebtoken');
const createJSONWebToken = (user, secretKey, expiresIn) => {

    if (typeof user !== "object" || !user) throw new Error("user must be an object");
    if (typeof secretKey !== "string" || secretKey === "") throw new Error("secretKey must be a string");

    try {
        const token = jwt.sign(user, secretKey, { expiresIn });
        return token
    } catch (error) {
        console.error("Failed to sign JWT", error);
        throw error
    }

}



module.exports = { createJSONWebToken }