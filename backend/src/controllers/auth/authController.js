const bcrypt=require("bcryptjs");
const Auth = require("../../models/authModels/auth.model");
const UserDto = require("../../dto/UserDto");
const JwtTokens = require("../../token/tokens");
const ErrorHandler = require("../../errors/errorHandler");

const authController = () => {

  return {

    async signin(req, res, next) {
      // Get form data from body
      const { fullName, username, email, password, avator } = req.body;

      const validateUser = [fullName, username, email, password, avator];

      // Validate data
      if (validateUser.some((value) => value === "")) {

       return next(new ErrorHandler("All fields are required", 400))

      } else {

        try {
          // Match email and username
          const matchUser = await Auth.findOne({ $or: [{ username }, { email }]});

          if (matchUser) {

            return next(new ErrorHandler("username or email is already taken",400))

          }else{

            // hash password
            const hashPwd= await bcrypt.hash(password, 10);

            // Create user
            const createUser= new Auth({fullName, username, email, password:hashPwd, avator});

             // Generate jwt token
             const token= await (await JwtTokens()).accessToken({_id:createUser._id})

            // saved user in database
            const savedUser= await createUser.save();
      
            // store jwt token in cookie
            res.cookie("JwtToken", token)

            // Conver saved data to dto user 
            const user= new UserDto(savedUser);

            // response
            return res.status(201).json(user);
          }

        } catch (error) {

          res.status(401).json(error);
          throw error;
        }
      }

    },
    async login(req, res, next) {

      // Get form data from body
      const {username, email , password} = req.body;

      // validate user
      if(!username && !email || !password){

        return next(new ErrorHandler("All fields are  required", 401))
      }

      try {
        
      // match user
      const user= await Auth.findOne({$or : [{username}, {email}]})

      if(user){
 
        // compare password
        const matchPwd= await bcrypt.compare(password, user.password)
 
        // if not match user password
        if(!matchPwd){
  
          return next(new ErrorHandler("wrong username or password", 401))
        }
 
         // Generate jwt token
         const token= await (await JwtTokens()).accessToken({_id:user._id})

        //  store jwt token in cookie
        res.cookie("JwtToken", token)

       //  loged in user
       return res.status(200).json({message: "You are logged in successfully.."})
 
      }else{
 
       return next(new ErrorHandler("Opps no user exists", 401))
      }

      } catch (error) {
        
        return next(new ErrorHandler(error, 401))
      }
    
    },
    async logout(req, res, next) {

      // clear store cookie
      res.cookie("JwtToken", null, {expires: new Date(Date.now()), httpOnly:true})

      return res.status(200).json({ success:true, message: "You are logout!"})
    
    },
  };
};

module.exports = authController;
