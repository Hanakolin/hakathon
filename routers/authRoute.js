const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const isAuthenticated = require('../middleware/auth');

router.get('/aauthorized', isAuthenticated, blogController.showAuthorized);

router.get('/register', (req, res) => {
    res.render('register'); // Make sure you have views/register.ejs
});

router.post('/register', (req, res) => {
    // Handle registration logic here
    // Example:
    // const { username, email, password } = req.body;
    // Save user to database...
    // After successful registration, redirect to login page:
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('login'); // Make sure you have views/login.ejs
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render('login', { error: 'Email and password are required.' });
    }

    // TODO: Replace with real authentication
    // Example: Check user in database
    // const user = await User.findOne({ email, password });
    // if (!user) {
    //     return res.render('login', { error: 'Invalid credentials.' });
    // }

    // Simulate login success:
    req.session.user = { email }; // Set session user
    res.redirect('/aauthorized');
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.get('/dashboard', (req, res) => {
    res.render('dashBoard'); // Make sure the filename matches your EJS file
});

module.exports = router;