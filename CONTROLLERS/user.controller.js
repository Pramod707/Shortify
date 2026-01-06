const { v4: uuidv4 } = require("uuid");
const User = require("../MODELS/user.model");
const {setUser} = require("../SERVICE/auth.service");
//post signuprequest
async function handelSignUp(req, res) {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

//post login request
async function handelLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login.view.ejs", {
      error: "invalid user name or password",
    });
    //creating session
  const sessionId = uuidv4();
  setUser(user,sessionId);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

module.exports = {
  handelSignUp,
  handelLogin,
};
