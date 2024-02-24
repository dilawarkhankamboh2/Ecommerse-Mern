
const { createProductReview, allReviews, deleteReview } = require("../controllers/products/reviews/reviewsController");
const auth = require("../middlewares/auth.middleware")


const productReviews= (app)=>{

// create and update reviews
app.put("/review", auth, createProductReview)

// get all reviews
app.get("/all-reviews", auth, allReviews)

// delete single review
app.delete("/delete-review", auth, deleteReview)

}

module.exports= productReviews;