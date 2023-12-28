const User = require("../models/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//-------------Registration---------------
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //make sure user are providing data: validation
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please provide all the required data");
  }

  //check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create the user
  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });

  // add the date the trial will end
  newUser.trialExpires = new Date(
    new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000
  );

  // save the user
  await newUser.save();
  res.json({
    status: true,
    message: "Registration was Successfull",
    user: {
      username,
      email,
    },
  });
});

//-------------Login---------------

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check for user email
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }

  // check for password (if password is valid)
  const isMatch = await bcrypt.compare(password, user?.password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }

  //Generate token (jwt)
  const token = jwt.sign(
    {
      id: user?._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    }
  );

  //set the token into cookie (http only)
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  // send the response
  res.json({
    status: "success",
    _id: user?._id,
    message: "Login was Successfull",
    username: user?.username,
    email: user?.email,
  });
});

//-------------Logout---------------
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "",{maxAge:1});
  res.status(200).json({
    status: true,
    message: "Logout was Successfull",
  });
});

//-------------Profile---------------

//-------------Check User Auth Status---------------

// export
module.exports = {
  register,
  login,
  logout,
};
