const ErrorHandler = require("../errors/errorHandler")

const isRole= (...role)=>{

    return (req,res, next)=>{

        !role.includes(req.user.role) ? next( new ErrorHandler(`${req.user.role} can't access this resource`)) : next()
    }
}

module.exports= isRole;
