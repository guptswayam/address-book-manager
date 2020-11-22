const express = require("express");
const session = require("express-session")
const MongodbStore = require("connect-mongodb-session")(session);
const userRouter = require("./router/userRouter")
const addressBookRouter = require("./router/addressBookRouter")
const app = express();
const path = require("path")

const store = new MongodbStore({
    uri: process.env.DB.replace("<password>", process.env.DB_PASSWORD),
    collection: "sessions",
    expires: new Date(Date.now() + 86400*1000)
})

app.use(express.json());
app.use(session({secret: "swayam_gupta", resave: false, saveUninitialized: false, store: store, cookie: {
    secure: process.env.NODE_ENV==="development"?false:true,
    maxAge: 86400*1000      // although session will be destroyed when we close our browser
}}));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/contacts", addressBookRouter);;


app.get("/api/v1/check", (req,res,next)=>{
    res.status(200).json({
        status: "success"
    })
})

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
);

app.use((err,req,res,next)=>{
    let statusCode = err.statusCode || 500;
    if(err.name==="ValidationError")
        statusCode = 400;
    if(err.code==11000)
        statusCode= 400;
    res.status(statusCode).json({
        status: "fail",
        message: err.message
    })
    next();
})

module.exports = app;