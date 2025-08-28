const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync =require("../utils/wrapAsync.js");
const ExpressError =require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const Review =require("../models/review.js")
const Listing =require("../models/listing.js")

// Validate review data
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body.review); // Assuming review data is in req.body.review
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(",");
        return next(new ExpressError(400, errMsg));
    } else {
        next();
    }
};

const reviewController = require("../controllers/reviews.js");

// Reviews Post Route 
router.post("/", validateReview, wrapAsync(reviewController.createReview));

//Delete review Route
router.delete("/:reviewId", wrapAsync(reviewController.destroyReview));

module.exports = router;