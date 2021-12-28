const User = require("../../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
    
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        message: "admin already registered",
      });
    }
  });
  const { firstName, lastName, email, password } = req.body;
  
  const _user = new User({
    firstName,
    lastName,
    email,
    password,
    userName: Math.random().toString(),
    role:'admin'
  
  });
 
  _user.save((error, data) => {
   
    if (error) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
    
    if (data) {
      return res.status(200).json({
        message: "admin created successfully",
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      return res.status(400).json({
        error,
      });
    }
    console.log("user", user);
    if (user) {
      if (user.authenicate(req.body.password) && user.role === "admin") {
        console.log(req.body.password);
        // token is generated
        const token = jwt.sign({ _id: user._id ,role:user.role}, process.env.SECRET_KEY, {
          expiresIn: "6h",
        });
        const { firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: {
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          user: "Invalid password",
        });
      }
    } else {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  });
 
};

