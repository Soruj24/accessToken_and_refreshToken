const { body } = require('express-validator');

const registerValidator = [
    // Username validation
    body("username")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long")
        .isAlphanumeric()
        .withMessage("Username must only contain letters and numbers")
        .trim(), // To remove any leading or trailing spaces

    // Email validation
    body("email")
        .isEmail()
        .withMessage("Please provide a valid email address")
        .normalizeEmail() // To ensure email is normalized (e.g., lowercase)
        .trim(),

    // Password validation
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
        .withMessage("Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character")
        .trim(),

    // Confirm password validation
    body("confirmPassword")
        .exists()
        .withMessage("Please confirm your password")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Passwords do not match")
        .trim(),



    // Image validation (if you have an image field)
    // body("image")
    //     .optional()
    //     .custom((value) => {
    //         if (value && !/^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|tiff|webp)$/i.test(value)) {
    //             throw new Error("Invalid image URL format. Please provide a valid image link.");
    //         }
    //         return true;
    //     })
];

const loginValidator = [
    // Email validation
    body("email")
        .isEmail()
        .withMessage("Please provide a valid email address")
        .normalizeEmail() // To ensure email is normalized (e.g., lowercase)
        .trim(),

    // Password validation
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
        .withMessage("Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character")
        .trim(),
]



module.exports = { registerValidator, loginValidator }
