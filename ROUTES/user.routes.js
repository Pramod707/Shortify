const express = require('express');
const Router = express.Router();
const{handelSignUp,handelLogin} = require('../CONTROLLERS/user.controller');

Router.post('/',handelSignUp);
Router.post('/login',handelLogin);





module.exports = Router;