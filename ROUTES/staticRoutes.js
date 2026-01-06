const express = require("express");
const router = express.Router();
const Url = require("../MODELS/url.model")
router.get("/", async (req, res) => {
  if(!req.user){
    return res.render("login.view.ejs");
  }
  const Allurls = await Url.find({createdBy : req.user._id});
  return res.render("home.view.ejs", {
    urls: Allurls,
  });
});

router.get('/signup',(req,res)=>{
  return res.render("signUp.view.ejs");
})
router.get('/login',(req,res)=>{
  return res.render("login.view.ejs");
})

module.exports = router;
