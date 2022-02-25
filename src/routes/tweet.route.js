const express = require("express");
const router = express.Router();

const tweetController = require("../controllers/tweet.controller");

const tweetValidator = require("../utils/tweetValidator");
const paramValidator = require("../utils/paramValidators");
const validatorMiddleware = require("../middlewares/validator.middleware");


router.get("/", tweetController.getAllTweets);

router.get("/:tweetId",  
            paramValidator.tweetIdValidator, 
            validatorMiddleware,
            tweetController.getOneTweet
        );

router.post("/", 
            ...tweetValidator.tweetValidator, 
            validatorMiddleware,
            tweetController.createTweet 
        );

router.patch("/:tweetId", 
            paramValidator.tweetIdValidator, 
            ...tweetValidator.tweetUpdateValidator, 
            validatorMiddleware,
            tweetController.updateTweet 
        );


router.delete("/:tweetId", 
            paramValidator.tweetIdValidator, 
            validatorMiddleware,
            tweetController.deleteTweet 
        )

module.exports = router;