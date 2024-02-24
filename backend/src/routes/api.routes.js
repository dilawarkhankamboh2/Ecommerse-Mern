const productRoutes = require("./products.routes");
const authRoutes = require("./auth.routes");
const userRoutes= require("./user.routes");
const adminRoutes = require("./admin.routes");
const productReviews = require("./reviews.routes");

const apiRoutes= async (app)=>{

   productRoutes(app)
   productReviews(app)
   authRoutes(app)
   userRoutes(app);
   adminRoutes(app)
}

module.exports= apiRoutes;