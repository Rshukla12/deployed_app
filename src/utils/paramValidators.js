const { param } = require("express-validator");

const userIdValidator = param("userId").isLength({min: 24, max: 24}).withMessage("User id should be 24 character long!");

const tweetIdValidator = param("tweetId").isLength({min: 24, max: 24}).withMessage("User id should be 24 character long!");

module.exports = {
    userIdValidator,
    tweetIdValidator
}