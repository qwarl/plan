const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/UsersController');

router.post('/register', usersController.register);

module.exports=router