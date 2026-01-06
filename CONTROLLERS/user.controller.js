
 const{v4 : uuidv4} = require("uuid");
const User = require("../MODELS/user.model");
//post signuprequest
async function handelSignUp(req, res) {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });
  return res.redirect('/');
}

//post login request
async function handelLogin(req,res) {
    const{email, password} = req.body;
    const user = await User.findOne({email,password});
    if(!user)return res.render("login.view.ejs",{
        error : "invalid user name or password"
    });
    const sessionId = uuidv4();
    return res.redirect('/');
}

module.exports = {
  handelSignUp,
  handelLogin
};
