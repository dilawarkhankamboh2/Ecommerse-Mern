const UserDto = require("../../dto/UserDto");
const asyncError = require("../../errors/async.errors");
const ErrorHandler = require("../../errors/errorHandler");
const User= require("../../models/authModels/auth.model")


const allUsers= asyncError(async(req, res, next)=>{

    const user = await User.find({}).select(["-password", "-updatedAt"]);

    !user ? next(new ErrorHandler("user not found!", 400)) : res.status(200).json(user);

})

const singleUser= asyncError(async(req, res, next)=>{

    const user= await User.findById({_id: req.params.id}).select(["-password", "-updatedAt"]);

    !user ? next(new ErrorHandler("user not found!", 400)) : res.status(200).json(user);

})

const updateUserRole= asyncError(async(req, res, next)=>{

    const user= await User.findById({_id: req.params.id})

    if(!user){

       return next(new ErrorHandler("user not found!", 400)) 
    }

    const updateUser= await User.findByIdAndUpdate(req.params.id, req.body, {

        new:true,
        runValidators:true
    });

    return res.status(200).json(updateUser);
})

const deleteUser= asyncError(async(req, res, next)=>{

    const user= await User.findById({_id: req.params.id})

    if(!user){

        return next(new ErrorHandler("user not found!", 400)) 
    }

    const deleteUser= await User.findByIdAndDelete(req.params.id)

    return res.status(200).json({success:true, message: "User deleted successfully"})
})


module.exports={allUsers, singleUser, updateUserRole, deleteUser};