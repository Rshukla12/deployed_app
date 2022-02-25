const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

const userValidator = require("../utils/userValidator");
const paramValidator = require("../utils/paramValidators");
const validatorMiddleware = require("../middlewares/validator.middleware");
const upload = require("../utils/upload");

router.get("/", userController.getAllUsers);

router.post("/", 
            ...userValidator, 
            validatorMiddleware, 
            userController.createUser
        );

router.get("/:userId", 
            paramValidator.userIdValidator, 
            validatorMiddleware,
            userController.getUser 
        );

router.patch("/:userId", 
            paramValidator.userIdValidator, 
            userValidator[0], 
            validatorMiddleware,
            userController.changeUsername
        );

router.delete("/:userId", 
            paramValidator.userIdValidator, 
            validatorMiddleware,
            userController.deleteUser
        );

router.get("/:userId/tweets", 
            paramValidator.userIdValidator, 
            validatorMiddleware,
            userController.getTweetsByUser 
        );


router.post("/:userId/avatar", 
            upload.single('avatar'),
            paramValidator.userIdValidator,
            validatorMiddleware,
            userController.uploadAvatar
        )
module.exports = router;