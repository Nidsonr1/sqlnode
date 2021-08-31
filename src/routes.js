const express = require('express');
const route = express.Router();

const UserController = require('./controller/UserController');

route.post('/users', UserController.store);
route.post('/users/login', UserController.login);
route.get('/users', UserController.index);

module.exports = route;