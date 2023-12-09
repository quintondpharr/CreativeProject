'use strict';

const express = require('express');
const app = express();

// ONLY USE THESE WHEN YOU HAVE POST ENDPOINTS
const multer = require('multer');

// for application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true})); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
// for multipart/form-data (required with FormData)
app.use(multer().none()); // requires the "multer" module

let userLogin = {
  "username": "",
  "password": ""
};

/**
 * Helper function for password validation
 * @param {string} password - the password to validate
 * @param {string} reEnterPassword - the password to compare against
 * @returns {Boolean} - true if the passwords match, false otherwise
 */
function isPasswordMatch(password, reEnterPassword) {
  return password === reEnterPassword;
}

app.post('/register', (req, res) => {
  res.type('text');
  let username = req.body.username;
  let password = req.body.password;
  let reEnterPassword = req.body['re-enter-password'];
  userLogin.username = username;
  userLogin.password = password;
  if (isPasswordMatch(password, reEnterPassword)) {
    res.send('success');
  } else {
    res.status(400).send('error - passwords do not match');
  }
});

app.post('/login', (req, res) => {
  res.type('text');
  let username = req.body.username;
  let password = req.body.password;
  if (username === userLogin.username && password === userLogin.password) {
    res.send('success');
  } else {
    res.status(400).send('error - username or password is incorrect');
  }
});

app.use(express.static('public')); // serves files from "public" folder
const PORT = process.env.PORT || 8000;
app.listen(PORT);