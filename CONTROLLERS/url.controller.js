const  {nanoid} = require('nanoid');
const url = require('../MODELS/url.model');

//creating short url or posting the new url
async function handleGenerateNewShortUrl(req,res) {
    const body = req.body;
    if(!body)return res.status(400).json({error : 'url required'})
    const shortId = nanoid(8);
    url.create({
        shortId : shortId,
        RedirectUrl : body.url,
        vistHistory  : []
    })
    return res.json({id : shortId})
}

async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await url.findOne({shortId});
    return res.json({
        totalClicks : result.vistHistory.length,
        analytics : result.vistHistory
    });;
    
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics
}