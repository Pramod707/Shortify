const  {nanoid} = require('nanoid');
const url = require('../MODELS/url.model');

//creating short url or posting the new url
async function handleGenerateNewShortUrl(req,res) {
    const body = req.body;
    if(!body)return res.status(400).json({error : 'Bad request'})
    const shortId = nanoid(8);
    url.create({
        shortId : shortId,
        RedirectUrl : body.url,
        vistHistory  : []
    })
    return res.json({id : shortId})
}

module.exports = {
    handleGenerateNewShortUrl,


}