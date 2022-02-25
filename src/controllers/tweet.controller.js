const Tweet = require("../models/tweet.model");
const User = require("../models/user.model");


const getAllTweets = async (req, res) => {
    try {
        const pageNo = req.params.page || 1;
        const perPage = req.params.per_page || 30;
        const skip = pageNo <= 0 ? 0 : (pageNo - 1 ) * perPage;
        
        const tweets = await Tweet.find({}).skip(skip).limit(perPage);

        if ( !tweets.length ) return res.status(404).json({msg: "No tweets were found!"});
        
        // res.status(200).json(tweets);
        res.render("pages/index", {tweets: tweets});
    } catch ( err ) {
        res.status(500).json({msg: "Something went wrong!"});
    }
};

const getOneTweet = async (req, res) => {
    try {
        const tweet = await Tweet.find({_id: req.params.tweetId});
        if ( !tweet.length ) return res.status(404).json({msg: "tweet does not exists!"});
        res.status(200).json(tweet[0]);
    } catch ( err ) {
        res.status(500).json({msg: "Something went wrong!"});
    }
};

const createTweet = async (req, res) => {
    try {
        const doesUserExist = await User.findOne({_id: req.body.user_id});
        if ( !doesUserExist ) return res.status(403).json({ msg: "User does not exists!" });
    
        const tweet = await Tweet.create({
            title: req.body.title,
            body: req.body.body,
            tags: req.body.tags || [],
            user_id: req.body.user_id
        });
    
        if ( !tweet ) throw new Error({msg: "Tweet was not created!"});
        res.status(201).json(tweet);
    } catch ( err ) {
        res.status(500).json({msg: err.msg || "Something went wrong!"});
    }
};

const updateTweet = async (req, res) => {
    try {
        const doesTweetExist = await Tweet.find({_id: req.params.tweetId});
        if ( !doesTweetExist.length ) return res.status(404).json({msg: "tweet does not exists!"});
        
        const updatedTweet = {};

        if ( req.body.title ) updatedTweet.title = req.body.title;
        if ( req.body.body ) updatedTweet.body = req.body.body;
        if ( req.body.tags ) updatedTweet.tags = req.body.tags;

        const tweet = await Tweet.findOneAndUpdate({
            _id: req.params.tweetId
        }, updatedTweet, {
            returnOriginal: false
        });
    
        if ( !tweet ) throw new Error({msg: "Tweet was not updated!"});
        
        res.status(200).json(tweet);
    } catch ( err ) {
        res.status(500).json({msg: err.msg || "Something went wrong!"});
    }
};

const deleteTweet = async (req, res) => {
    try {
        const doesTweetExist = await Tweet.find({_id: req.params.tweetId});
        if ( !doesTweetExist.length ) return res.status(404).json({msg: "tweet does not exists!"});
        
        const tweet = await Tweet.deleteOne({ _id: req.params.tweetId });

        if ( !tweet ) throw Error({msg: "Tweet not deleted!"});

        res.status(200).json({msg: "Tweet deleted successfully!"});
    } catch (err) {
        res.status(500).json({ msg: "something went wrong!" });
    }
};

module.exports = {
    getAllTweets,
    getOneTweet,
    createTweet,
    updateTweet,
    deleteTweet
};