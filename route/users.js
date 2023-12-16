

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const Joi = require('joi');
const { User } = require('../model/index');
const {validate, loginValidation } = require('../model/users');



router.post('/register', async (req, res) => {
    try {
        // Validate the request body against the user schema
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        // Check if the user is already registered
        const existingUser = await User.findOne({ where: { username: value.username } });

        if (existingUser) {
            return res.status(400).json({ error: 'Username is already taken' });
        }

        // Check if the password and confirmpassword match
        if (value.password !== value.confirmpassword) {
            return res.status(400).json({ error: 'Password and Confirm Password do not match' });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(value.password, 10);

        // Create a new user in the database
        const newUser = await User.create({
            username: value.username,
            password: hashedPassword,
            confirmpassword: value.confirmpassword,
        });
        // Generate a JWT token for the registered user
        const token = jwt.sign({ userId: newUser.id, username: newUser.username }, 
            'your-secret-key', {
            expiresIn: '', // Token expiration time
        });

        // Send the JWT token in the response header
        res.header('x-auth-token', token).json({ message: 'Registration successful!', 
        user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// routes/login.js

router.post('/login', async (req, res) => {
    try {
        // Validate the request body against the login schema
        const { error, value } = loginValidation.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { username, password } = value;

        // Check if the user exists
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Generate a JWT token for the authenticated user
        const token = jwt.sign({ userId: user.id, username: user.username }, 'your-secret-key', {
            expiresIn: '', // Token expiration time
        });

        res.header('x-auth-token', token).json({ message: 'Login successful!', user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;







