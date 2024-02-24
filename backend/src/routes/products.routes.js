const { createProducts, readAllProducts, readSingleProduct, updateSingleProduct, deleteSingleProduct } = require("../controllers/products/productsControllers");
const auth = require("../middlewares/auth.middleware");
const isRole = require("../middlewares/isRole.middleware");

const productRoutes=async (app)=>{

app.post("/api/products/create", auth,isRole("admin"), createProducts);
app.get("/api/products/read",  readAllProducts);
app.get("/api/products/single-product/:id", readSingleProduct);
app.put("/api/products/update-product/:id",auth,isRole("admin"), updateSingleProduct);
app.delete("/api/products/delete/:id",auth,isRole("admin"), deleteSingleProduct);

}

module.exports= productRoutes;