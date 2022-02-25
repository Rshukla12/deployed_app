const { body } = require("express-validator");

const tweetValidator = [
    body('title').notEmpty().withMessage("Tweet's title is required!").isString().withMessage("Tweet title must be a string!"),
    body('body').notEmpty().withMessage("Tweet's body is required!").isString().withMessage("Tweet body must be a string!"),
    body('user_id').notEmpty().withMessage("user_id is required to tweet!").isString().withMessage("User id should be a valid string!").isLength({min: 24, max: 24}).withMessage("User id should be 24 character long!"),
    body('tags').optional().isArray().withMessage("Tags should be an array of strings!"),
];

const tweetUpdateValidator = [
    body('title').optional().isString().withMessage("Tweet title must be a string!"),
    body('body').optional().isString().withMessage("Tweet body must be a string!"),
    body('tags').optional().isArray().withMessage("Tags should be an array of strings!"),
];

module.exports = {
    tweetValidator,
    tweetUpdateValidator
}