const express = require("express");
const User = require('../models/User');
const router = express.Router();
const { body, ValidationResult, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "RushiIisagood$boy";
//ROUTE 1 : Create a User using : POST "/api/blog/createuser. Doesent requrie Auth No login requrire
router.post('/createuser', [
    body('name', 'Enter the valid name').isLength({ min: 3 }),
    body('email', 'Enter the valid Email').isEmail(),
    body('password', 'Password must be atleast 5 character').isLength({ min: 5 })
], async (req, res) => {

    // If therer are error return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        // check wether the user with this email exists already

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'Sorry a user with this email already exists' })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken })
        // res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

//ROUTE 2: Authuntication of user : POST "/api/blog/login. Doesent requrie Auth No login requrire
router.post('/login', [
    body('email', 'Enter the valid Email').isEmail(),
    body('password', 'Password cannot be blank').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const { email, password } = req.body;
    try {
        // check wether the user with this email exists already
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Please enter the vild email or password' })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: 'Please enter the vild email or password' })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken })
        // res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})
// ROUTE 3 : POST "/api/auth/userdata. Doesent requrie Auth No login requrire
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router