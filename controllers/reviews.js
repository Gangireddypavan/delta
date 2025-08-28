const Listing =require("../models/listing");
const Review =require("../models/review");

module.exports.createReview =async (req, res, next) => {
    try {
        console.log(req.params.id);
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);

        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
        res.redirect(`/listings/${listing._id}`);
    } catch (e) {

        next(e);
    }};

module.exports.destroyReview =async(req,res)=>{
        let { id,reviewId}= req.params;
        await listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
        await Review.findByIdAndDelete(reviewId);

        res.redirect(`/listings/${id}`);
    };

