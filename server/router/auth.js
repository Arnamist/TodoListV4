const express = require('express');
//const router will get all the abilities of the router.
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");

require('../db/conn');
const User = require("../model/userSchema");

//Register Route
router.post('/register', async (req, res) => 
{
    const { name, email, phone, password, cpassword} = req.body;
    
    if (!name || !email || !phone || !password || !cpassword) 
    {
        return res.status(422).json({ error: "Please fill the field properly" });
    }

    try 
    {
        //Check if the user exists in our database.
        const userExist = await User.findOne({ email: email });

        if (userExist) 
        {
             return res.status(422).json({ error: "Email already Exist" });
        } 
        else if (password != cpassword) 
        {
             return res.status(422).json({ error: "passwords are not matching" });
        } 
        else 
        {
            const user = new User({ name, email, phone, password, cpassword });
             
            //Presave method will be called here

            await user.save();

            res.status(201).json({ message: "user registered successfuly" });
        }
    } 
    catch (err) 
    {
        console.log(err);
    }
});

//Login Route
router.post('/signin', async (req, res) => 
{
    try 
    {
        let token;
        const { email, password } = req.body;

        if (!email || !password) 
        {
            return res.status(400).json({error:"Plz Fill the data"})
        }

        const userLogin = await User.findOne({ email: email });

        // console.log(userLogin);

        if (userLogin) 
        {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) 
            {
                res.status(400).json({ error: "Invalid Credientials " });
            } 
            else 
            {
                // need to genereate the token and stored cookie after the password match 
                token = await userLogin.generateAuthToken();

                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly:true
                });
                
                res.json({ message: "user Signin Successfully" });
            }
        } 
        else 
        {
             res.status(400).json({ error: "Invalid Credientials " });
        }

    } 
    catch (err) 
    {
        console.log(err);
    }
});

//create Aboutus Route
router.get('/about', authenticate ,(req, res) => {
    res.send(req.rootUser);
});

//Edit Aboutus Route
router.post('/updateAbout', authenticate, async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        console.log(req.body);
        if (!name || !email || !phone) {
            console.log("error in contact form");
            return res.json({ error: "plzz filled the contact form " });
        }

        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {
            const userInfo = await userContact.updateBasicInfo(name, email, phone);
            console.log(userInfo);
            await userContact.save();
            res.status(201).json({ message: "user Contact successfully" });
        }
    } catch (error) {
        console.log(error);
    }
});

// get user data for home page 
router.get('/getdata', authenticate, (req, res) => {
    res.send(req.rootUser);
});

// add Task
router.post('/addTask', authenticate, async (req, res) => {
    try {
        const userTask = req.body.newTask;
        if (!userTask || userTask == "") {
            console.log("Error: Task is null.");
            return res.json({ error: "plzz provide valid task." });
        }

        const user = await User.findOne({ _id: req.userID });
        if (user) {
            await user.addTodoList(userTask[0]);
            await user.save();
            res.status(201).json({ message: "Task added successfully" });
        }
    } catch (error) {
        console.log(error);
    }
});

// delete Task
router.post('/deleteTask', authenticate, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userID });
        if (user) {
            const taskId = req.body;
            await user.deleteTodoItem(taskId);
            await user.save();
            res.status(201).json({ message: "Task deleted successfully" });
        }
    } catch (error) {
        console.log(error);
    }
});

// check change on Task
router.post('/checkTask', authenticate, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userID });
        if (user) {
            const taskId = req.body;
            await user.checkChange(taskId);
            await user.save();
            res.status(201).json({ message: "Task deleted successfully" });
        }
    } catch (error) {
        console.log(error);
    }
});

// Logout 
router.get('/logout', (req, res) => {
    console.log(`Hello my Logout Page`);
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User logout');
});


module.exports = router;