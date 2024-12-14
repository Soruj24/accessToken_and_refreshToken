const { handleUserCreate, handleSignalUser, handelDeleteUser, handelUpdateUser, handelGetAllUsers } = require('../controller/userController')
const runValidator = require('../validator')
const { registerValidator } = require('../validator/userValidator')


const userRouter = require('express').Router()

userRouter.get("/", handelGetAllUsers)
userRouter.post("/register", registerValidator, runValidator, handleUserCreate)
userRouter.get("/:id", handleSignalUser)
userRouter.delete("/:id", handelDeleteUser)
userRouter.put("/:id", handelUpdateUser)

module.exports = userRouter