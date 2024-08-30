// login.js

const path = require('path')
const fs = require('fs'); //import for fs module
const express = require('express');
const data = require('./data');  // Make sure this is included

const router = express.Router();

const rootDir = require('../util/path')

//Get route to display the contact form
router.get('/', (req,res,next) => {
    //console.log('In another middleware!');
    res.sendFile(path.join(rootDir, 'views', 'contact.html'));
});


// POST route to handle form submission
router.post('/', (req, res,next) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).send('All fields are required');
    }

    //log the entered details to the console
    console.log(`Received submission - Name: ${name}, Email: ${email}`);


    //use the append MEssage function from data.js
    data.appendMessage(name, email, (err) => {
        if (err) {
            return res.status(500).send('server error');
        }
    // Redirect to the success page
    res.redirect('/success');
    });
});

module.exports = router;
