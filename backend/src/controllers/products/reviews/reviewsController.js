const asyncError = require("../../../errors/async.errors");
const Products = require("../../../models/productsModels/products.model");

//  create new review or update the review
const createProductReview= asyncError(async(req, res, next)=>{

    const {name, rating, comment, productId } = req.body;

  const review = {user: req.user._id, name, rating: Number(rating), comment};

    const product = await Products.findById(productId);

    let userReviewFound = false;

    product.reviews.forEach(rev => {

        if (!rev.user || rev.user.toString() === req.user._id.toString()) {
            rev.user = req.user._id;
            rev.name = name;
            rev.comment = comment;
            rev.rating = rating;
            userReviewFound = true;
        }
    });

    if (!userReviewFound) {product.reviews.push(review)};

    product.numofReviews=product.reviews.length
    await product.save();
    res.status(200).json({ success: true });

})

// Get all reviews
const allReviews= asyncError(async(req, res, next)=>{

    const products = await Products.findById(req.query.id);

    !products ? res.status(404).json({message: "!product not found"}) :
    res.status(200).json(products.reviews)

})

// Get all reviews
const deleteReview= asyncError(async(req, res, next)=>{

    const { productId, id } = req.query;

    // Check if productId or id is missing
    if (!productId || !id) {
        return res.status(400).json({ message: "Both productId and id are required" });
    }

    const product = await Products.findById(productId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    const updatedReviews = product.reviews.filter(review => review._id.toString() !== id.toString());
    
    product.reviews = updatedReviews;
    await product.save();
    res.status(200).json({ success: true });
})


module.exports= {createProductReview,allReviews, deleteReview};