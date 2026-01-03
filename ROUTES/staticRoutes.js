const express = require("express");
const router = express.Router();
const Url = require("../MODELS/url.model")
router.get("/", async (req, res) => {
  const Allurls = await Url.find({});
  return res.render("home.view.ejs", {
    urls: Allurls,
  });
});

module.exports = router;
