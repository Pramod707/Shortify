const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    return res.render('home.view.ejs')
})

module.exports = router;