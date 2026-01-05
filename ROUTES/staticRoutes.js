const express = require("express");
const router = express.Router();
const Url = require("../MODELS/url.model")
router.get("/", async (req, res) => {
  const Allurls = await Url.find({});
  return res.render("home.view.ejs", {
    urls: Allurls,
  });
});

router.get('/signup',(req,res)=>{
  return res.render('user.view.ejs');
})

module.exports = router;
