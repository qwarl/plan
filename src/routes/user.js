const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/UsersController');
const authToken = require('../app/middlewares/auth');

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/getAll', usersController.getAll);
router.post('/removeUser/:IdUser', usersController.removeUser);
router.post('/updateUser/:IdUser', usersController.updateUser);

module.exports=router