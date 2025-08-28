const mongoose = require("mongoose");
const review = require("./review.js");
const { required } = require("joi");
const { types } = require("mime-types");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type :String,
      default: 'listingImage'
    },
    url :{
      type : String,
      default:  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8M3x8aG90ZWwlMjByb29tfHwwfHx8fDE2MzEzNTE1OTE&ixlib=rb-1.2.1&q=80&w=1080"
    }
  },
  // image: {
  //   type: String,
  //   default: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8M3x8aG90ZWwlMjByb29tfHwwfHx8fDE2MzEzNTE1OTE&ixlib=rb-1.2.1&q=80&w=1080",
  //   set: (v)+ => 
  //     v === "" ? "https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8M3x8aG90ZWwlMjByb29tfHwwfHx8fDE2MzEzNTE1OTE&ixlib=rb-1.2.1&q=80&w=1080" 
  //       : v,
  // },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required:true
  },
  country: {
    type: String,
    required:true
  },
  reviews: [{
      type:Schema.Types.ObjectId,
      ref:"Review"
    }],
    owner: {
      type:Schema.Types.ObjectId,
      ref: "User",
    },
    // category: {
    //   type:String,
    //   enum:
    // }
  });

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
     await review.deleteMany({_id : {$in: listing.reviews}});
  }
  });
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
