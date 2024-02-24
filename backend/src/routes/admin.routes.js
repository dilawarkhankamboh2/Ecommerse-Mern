const { allUsers, singleUser, updateUserRole, deleteUser } = require("../controllers/admin/adminController")
const auth = require("../middlewares/auth.middleware")
const isRole = require("../middlewares/isRole.middleware")

const adminRoutes= (app)=>{

    app.get("/admin/all-users", auth, isRole("admin"), allUsers )

    app.get("/admin/single-user/:id", auth, isRole("admin"), singleUser )

    app.put("/admin/update-user-role/:id", auth, isRole("admin"), updateUserRole )

    app.delete("/admin/delete-user/:id", auth, isRole("admin"), deleteUser )
}

module.exports= adminRoutes;