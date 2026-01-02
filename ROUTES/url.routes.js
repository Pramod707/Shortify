const express = require('express');
const Router = express.Router();
const {handleGenerateNewShortUrl} = require('../CONTROLLERS/url.controller');

Router.post('/',handleGenerateNewShortUrl)

module.exports = Router;