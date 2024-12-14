const { handelLoginUser, handelRefreshToken, handelLogOut, handelProtected } = require('../controller/authController')
const { isLoggedIn, isLoggedOut } = require('../middleware/auth')
const runValidator = require('../validator')
const { loginValidator } = require('../validator/userValidator')

const authRouter = require('express').Router()


authRouter.post('/login', isLoggedOut, loginValidator, runValidator, handelLoginUser)
authRouter.post('/refresh-token', handelRefreshToken)
authRouter.post('/logout', isLoggedIn, handelLogOut)
authRouter.post('/protected', handelProtected)



module.exports = authRouter