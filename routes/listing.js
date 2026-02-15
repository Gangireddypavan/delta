const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const methodOverride = require("method-override");
// const {listingSchema ,reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js")
const listingController = require("../controllers/listings.js")
const multer = require('multer');
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage });

// // Validate listing data
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body.listing);
  if (error) {
    error.details.map((el) => messages.push(el.message));
    req.flash("error", messages);
    return res.status(400).render("listings/new");
  }
};

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    wrapAsync(listingController.createListing)
  );

// NEW Route
router.get("/new", wrapAsync(listingController.renderNewForm))

router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    upload.single('listing[image]'),
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, wrapAsync(listingController.deleteListing));



// //Edit Route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.renderEditForm));

module.exports = router;