const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();

const rootDir = require('../util/path');
// Define the path to the message.txt file
const filePath = path.join(__dirname, 'message.txt');

// Function to append a message to the file
function appendMessage(name, email, callback) {
    const message = `Name: ${name}\nEmail: ${email}\n\n`;
    fs.appendFile(filePath, message, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return callback(err);
        }
        callback(null);
    });
}

// Function to read all messages from the file
function readMessages(callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading from file:', err);
            return callback(err);
        }
        callback(null, data);
    });
}

module.exports = {
    appendMessage,
    readMessages
};
