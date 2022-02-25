const { body } = require("express-validator");

const userValidator = [
    body('username').not().isEmpty().withMessage('username is required').isLength({ min: 5 }).withMessage("username must be 5 or more characters long"),
    body('email').not().isEmpty().withMessage('email is required').isEmail().withMessage("Email needs to be valid email address")
];


module.exports = userValidator;