const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");
const User= require("./user.js");


const listingSchema = new Schema({
    title:{
        type: String,
        required : true,
    },
    description:{
        type: String,
        required : true,
    },
    image:{
        filename : String,
        url : {
        type: String,
        default: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" : v ,
        },
    },
    price:{
        type: Number,
        min: 0,
        required: true,
    },
    location:{
        type: String,
        required : true,
    },
    country:{
        type: String,
        required : true,
    },
    review: [
        {
            type:Schema.Types.ObjectId,
            ref:Review,
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:User,
    },
    category:{
        type: String,
        enum:["camping", "mountain", "beach", "arctic", "pool", "golfing"]
    }
});

const Listing =  mongoose.model("Listing",listingSchema);
module.exports = Listing ; 