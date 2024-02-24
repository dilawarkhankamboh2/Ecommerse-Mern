const authController = require("../controllers/auth/authController")

const userRoutes= async (app)=>{

    app.post("/api/user/signin",authController().signin);
    app.post("/api/user/login",authController().login);
    app.post("/api/user/logout",authController().logout);
}

module.exports=userRoutes;