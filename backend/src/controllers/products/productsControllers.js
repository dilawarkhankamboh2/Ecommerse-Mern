const asyncError = require("../../errors/async.errors");
const Products = require("../../models/productsModels/products.model");
const ErrorHandler = require("../../errors/errorHandler");
const SearchFeatures = require("../../utils/searchFeatures");
const productsModel = require("../../models/productsModels/products.model");

// create products
const createProducts= asyncError( async (req, res, next)=>{

    const {
        name, description,price,rating, images,category,stock, numofReviews,reviews
    }= req.body

    if(!name || !description || !price ||!images ||!category || !reviews) {

       return next(new ErrorHandler("All fields are required",404))

    }else{
        
        const products= await Products.create({ name, description,price,rating, images,category,stock, numofReviews,reviews, user:req.user._id, })
   
           
        const saveProducts= await products.save();

        if(saveProducts) (res.json({response: saveProducts}));
    }
})

// read all products
const readAllProducts = asyncError(async (req, res, next)=>{

    //  const getProducts= await Products.find();
     const searchQuery= new SearchFeatures(Products.find(), req.query).search().filter()
     const products= await searchQuery.query;

     if(!products){

        return next(new ErrorHandler("Product not found",401));
     }
     else{

        return res.status(200).json(products)
     }

})

// read single product
const readSingleProduct= asyncError (async (req, res, next)=>{

    const product= await Products.findById({_id: req.params.id});

    if(!product){

        return next(new ErrorHandler("Product not found", 401))

    }else{

        return res.status(200).json(product)
    }
})

// update single product
const updateSingleProduct= asyncError(async (req, res, next)=>{

    
    const product= await Products.findOneAndUpdate({_id:req.params.id}, req.body)

    if(!product){

        return next(new ErrorHandler("Product not found", 401))

    }else{

        return res.status(200).json({message: "Product updated", product})
    }
    
 })

// delete single product
const deleteSingleProduct = asyncError(async (req, res, next)=>{

    const product= await Products.findOneAndDelete({_id:req.params.id})

    if(!product){

        return next(new ErrorHandler("Product not found", 401))

    }else{

        return res.status(200).json({message: "Product deleted"})
    }

 })

module.exports = {

    createProducts,
    readAllProducts,
    readSingleProduct,
    updateSingleProduct,
    deleteSingleProduct
};
