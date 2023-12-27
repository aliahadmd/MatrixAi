const User = require("../models/User");
const bcrypt = require("bcryptjs");


//-------------Registration---------------
const register=async (req,res, next)=>{
   try {
    const {username, email, password} = req.body;

    //make sure user are providing data: validation
    if (!username ||!email ||!password) {
        return res.status(400);
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
        password:hashedPassword,
        email,
    })

    // add the date the trial will end
    newUser.trialExpires = new Date(
      new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000
    );

        // save the user
        await newUser.save();
     res.json({
       status: true,
       message: "Registration was Successfull",
       user:{
        username,
        email,
       }
     });
   } catch (error) {
    next (error);
   }
};

//-------------Login---------------


//-------------Logout---------------


//-------------Profile---------------


//-------------Check User Auth Status---------------



// export
module.exports={
    register,
};