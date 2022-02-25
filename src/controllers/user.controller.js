const User = require("../models/user.model");
const Tweet = require("../models/tweet.model");

const getAllUsers = async (req, res) => {
    try {
        const pageNo = req.query.page || 1;
        const perPage = req.query.per_page || 10;
        const skip = pageNo <= 0 ? 0 : ( pageNo - 1 ) * perPage;
        const users = await User.find().skip(skip).limit(perPage);
        if ( !users.length ) return res.status(404).json({msg: "No users found!"});
        // res.status(200).json(users);
        res.render("pages/user", {users: users});
    } catch ( err ) {
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const createUser = async (req, res) => {
    try {
        const isUsernameUnique = await User.findOne({username: req.body.username});
        if ( isUsernameUnique ) return res.status(403).json({msg: "username is already taken!"})
        
        const doesUserExist = await User.findOne({email: req.body.email});
        if ( doesUserExist ) return res.status(403).json({msg: "user already exist!"})
        
        const user = await User.create({
            email: req.body.email,
            username: req.body.username
        });
        if ( !user ) throw Error({msg: "something went wrong while creating user!"})
        res.status(201).json(user);
    } catch ( err ) {
        res.status(500).json({ msg: err.msg || "something went wrong!" });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.find({
            _id: req.params.userId
        });
        if ( !user ) return res.status(404).json({msg: "User not found!"});
        res.status(200).json(user[0]);
    } catch ( err ) {
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const changeUsername = async (req, res) => {
    try {
        const isUsernameUnique = await User.findOne({username: req.body.username});
        if ( isUsernameUnique ) return res.status(403).json({msg: "username is already taken!"})

        const user = await User.findOneAndUpdate({
            _id: req.params.userId
        },{
            username: req.body.username
        },{
            returnOriginal: false
        });
        if ( !user ) return res.status(404).json({msg: "User not found!"});
        res.status(201).json(user);
    } catch ( err ) {
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.deleteOne({
            _id: req.params.userId
        });
        if ( !user ) return res.status(404).json({msg: "User not found!"});
        res.status(200).json({msg: "user deleted successfully!"});
    } catch ( err ) {
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const getTweetsByUser = async(req, res) => {
    try {
        const user = await User.find({
            _id: req.params.userId
        });
        if ( !user ) return res.status(404).json({msg: "User not found!"});
        
        // pagination
        const pageNo = req.query.page || 1;
        const perPage = req.query.per_page || 10; 
        
        const noOfTweets = await Tweet.find({ user_id: req.params.userId }).count();
        if ( !noOfTweets || !user.length  ) return res.status(404).json({msg: "No tweets were made by user!"});

        const skip = pageNo <= 0 ? 0 : ( pageNo - 1 ) * perPage;
        
        const tweets = await Tweet.find({ user_id: req.params.userId }).skip(skip).limit(perPage);
        
        // res.status(200).json({"no of tweets by user": noOfTweets, tweets: tweets});
        res.render("pages/userTweets", {user: user[0], tweets: tweets, noOfTweets: noOfTweets});
    } catch ( err ) {
        res.status(500).json({ msg: "something went wrong!" });
    }
};

const uploadAvatar = async (req, res) => {
    try {
        const doesUserExist = await User.find({
            _id: req.params.userId
        });
        if ( !doesUserExist ) return res.status(404).json({msg: "User does not exist!"});
        
        if ( !req.file || req.file.fieldname !== "avatar" ) return res.status(400).json({msg: "Avatar is required!"});
        
        const updatedProfile = await User.findOneAndUpdate({
            _id: req.params.userId
        }, {
            "avatar": req.file.path
        }, {
            returnOriginal: false
        });
        
        if ( !updatedProfile ) return res.status(500).json({"msg": "File not uploaded!"});

        res.status(201).json(updatedProfile);
    } catch (err) {
        res.status(500).json({ msg: "something went wrong!" });
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    changeUsername,
    deleteUser,
    getTweetsByUser,
    uploadAvatar
};