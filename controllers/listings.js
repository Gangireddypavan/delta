const Listing =require("../models/listing")

module.exports.index =async(req,res)=>{
    const allListings =await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}

module.exports.renderNewForm =(req,res)=>{
    res.render("listings/new.ejs");
}
module.exports.showListing = 
    async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    return res.render("listings/show.ejs", {listing});
};

module.exports.createListing =async (req,res,next)=>{
     const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
    }
module.exports.renderEditForm =async (req,res)=>{
      let {id} = req.params;
    const listing = await Listing.findById(id);
     return 
     res.render("listings/edit.ejs",{listing})
    }
module.exports.updateListing =async (req,res,next)=>{
     let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    return 
    res.redirect(`/listings/${id}`);
    }
module.exports.deleteListing =async (req,res)=>{
      let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
      req.flash("success", "Listing Deleted!");
  return res.redirect("/listings");
    };

