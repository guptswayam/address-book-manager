const mongoose = require("mongoose");
require("dotenv").config({
    path: `${__dirname}/config.env`
    // path: "./backend/config.env"         // this will also work
})

let DB = process.env.DB || 'mongodb://localhost/Simple-Address-Book';
DB = DB.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("connection successful!")
    const app = require("./app");
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, ()=>{
        console.log("server started at port "+ PORT);
    })
})
.catch(err=>console.log(err));


