const dotenv = require("dotenv");
const express = require('express');
const cookieParser = require('cookie-parser');
//Connecting the dotenv file to app.js
dotenv.config({path : './config.env'})

//In const app, we are storing all express methods.
const app=express();
app.use(cookieParser());


//Require the connection file by giving the path
require('./db/conn')

//Converting into JSON format
app.use(express.json());

//Accessing the PORT from config.env file
const PORT = process.env.PORT;

// we link the router files to make our routes easy 
app.use(require('./router/auth'));


//app.get() is used to retrieve data from a server at the specified resource
app.get('/signup',(req,res)=>{
    res.send("Hello from Signup page")
})
//The app.listen() function is used to bind and listen the connections
//on the specified port
app.listen(PORT, ()=>{
    console.log(`Server is running at port No : ${PORT}`);
})  




