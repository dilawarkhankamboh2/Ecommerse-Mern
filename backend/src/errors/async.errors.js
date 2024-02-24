

const asyncError= (fun) => async (req,res, next)=>{

    try {

       return await fun(req, res, next);

    } catch (error) {
        
        console.error("Async Error ***", error);
        
        res.status(error.code || 500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports= asyncError;