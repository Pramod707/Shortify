const express = require('express');
const Router = express.Router();
const{handelSignUp} = require('../CONTROLLERS/user.controller');

Router.post('/',handelSignUp);





module.exports = Router;