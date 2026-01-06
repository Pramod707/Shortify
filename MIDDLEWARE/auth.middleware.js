const { getUser } = require("../SERVICE/auth.service");

//middleware
async function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies.uid;
  if (!userUid) return res.render("/login");
  const user = get(userUid);
  if (!user) return res.render("/login");
  req.user = user;
  next();
}

module.exports = {
    restrictToLoggedInUserOnly
}
