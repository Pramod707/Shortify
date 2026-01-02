const express = require('express');
const Router = express.Router();
const {handleGenerateNewShortUrl,handleGetAnalytics} = require('../CONTROLLERS/url.controller');

Router.post('/',handleGenerateNewShortUrl)
Router.get('/analytics/:shortId',handleGetAnalytics);

module.exports = Router;