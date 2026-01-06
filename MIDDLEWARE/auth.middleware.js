const { getUser } = require("../SERVICE/auth.service");

async function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) {
    return res.render("login.view.ejs");
  }

  const user = await getUser(userUid);

  if (!user) {
    return res.render("login.view.ejs");
  }

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedInUserOnly
};
