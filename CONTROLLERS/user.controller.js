const User = require("../MODELS/user.model");
//post request
async function handelSignUp(req,res) {
const {name,email,password} = req.body;

const user = await User.create({
    name,
    email,
    password
})
return res.render("home.view.ejs");
    
}


module.exports = {
    handelSignUp
}

