const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connect = require("./config/db");

const userRouter = require("./routes/user.routes"); 
const tweetRouter = require("./routes/tweet.route");

const PORT = 5000;

const app = express();

app.set("view engine", "ejs");

app.use( express.static("./public") );
app.use(express.json());
app.use( cors() );

app.use("/user", userRouter);
app.use("/tweet", tweetRouter);
app.get("/", (req, res) => {
    res.redirect("/tweet");
});

const start = async () => {
    await connect();
    app.listen( PORT, () => {
        console.log("Listening on port:", PORT);
    });
};

module.exports = start;