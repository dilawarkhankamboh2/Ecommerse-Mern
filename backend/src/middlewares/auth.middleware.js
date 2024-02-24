const asyncError = require("../errors/async.errors");
const ErrorHandler = require("../errors/errorHandler");
const JwtTokens = require("../token/tokens");
const Auth =require("../models/authModels/auth.model");
const UserDto = require("../dto/UserDto");

const auth= asyncError(async(req, res, next)=>{

    const {JwtToken} = req.cookies;
    
    if(!JwtToken){

        return next(new ErrorHandler("Unauthorized user please logged in!", 401))
    }

    // verify jwt token
    const verifyUser= await JwtTokens().verifyAccessToken(JwtToken);

    // Get user
    const Getuser= await Auth.findOne({_id: verifyUser._id});

    // dto user
    const user= new UserDto(Getuser);

    // add global user
    req.user= user;
    next();
})


module.exports= auth;