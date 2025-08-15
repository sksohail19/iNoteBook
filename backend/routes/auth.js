const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema'); // Assuming you have a User model defined
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchUser = require('../middleware/fetchUser'); // Middleware to fetch user from token
const jwt = require('jsonwebtoken');

const JWT_SECRET = "AgJtUIy@#@!$%&*()_+1234567890"; // Use a secure secret in production

router.post('/signup', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, email } = req.body;
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ error: "User with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = new User({ name, email, password: secPass });
        await user.save()
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.status(201).json({ authToken, message: "User created successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken, user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post("/getprofile", fetchUser, async (req, res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;