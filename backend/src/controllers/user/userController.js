const UserDto = require("../../dto/UserDto");
const asyncError = require("../../errors/async.errors");
const ErrorHandler = require("../../errors/errorHandler");
const User = require("../../models/authModels/auth.model");
const bcrypt=require("bcryptjs")


const showmyProfile = asyncError(async (req, res, next) => {

  const getUser = await User.findById({ _id: req.user._id });

  const user = new UserDto(getUser);

  return res.send(user);

});

const changemyPassword= asyncError(async(req,res, next)=>{

    const user= await User.findById({_id:req.user._id})
    const matcholdPassword= await bcrypt.compare(req.body.oldPassword,user.password);

    if(!matcholdPassword){

        return next(new ErrorHandler("old password is incorrect",400))
    }

    const hashPwd= await bcrypt.hash(req.body.newPassword, 10)

    // update password
    user.password= hashPwd;
    
    await user.save();

    return res.status(200).json({success:true, message: "update your password"})
})

const updateProfile= asyncError(async(req,res, next)=>{

    // update profile
    const updateProfile= await User.findByIdAndUpdate({_id:req.user._id}, req.body, {

      new:true,
      runValidators:true
      
    })

    if(updateProfile){

      return res.status(200).json({success:true, message: "Your profile is updated"})
    }
    
})

module.exports = { showmyProfile, changemyPassword, updateProfile};
