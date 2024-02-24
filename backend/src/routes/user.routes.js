const { showmyProfile,changemyPassword, updateProfile } = require("../controllers/user/userController");
const auth = require("../middlewares/auth.middleware");

const userRoute= async (app)=>{

    app.post("/me/profile",auth, showmyProfile);

    app.put("/me/change/password",auth, changemyPassword);

    app.put("/me/update/profile", auth, updateProfile)

}

module.exports= userRoute;