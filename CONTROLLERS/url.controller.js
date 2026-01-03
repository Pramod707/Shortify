const { nanoid } = require("nanoid");
const url = require("../MODELS/url.model");

//creating short url or posting the new url
async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url required" });
  const shortId = nanoid(8);
  await url.create({
    shortId: shortId,
    RedirectUrl: body.url,
    visitHistory: [],
  });
  return res.render("home.view.ejs", { id: shortId });
}

async function handleGetAnalytics(req, res) {
  const { shortId } = req.params;

  const result = await url.findOne({ shortId });

  if (!result) {
    return res.status(404).json({
      error: "Short URL not found",
    });
  }

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
};
