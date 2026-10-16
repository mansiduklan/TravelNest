const Listing = require("../model/listing.js");
const Review = require("../model/reviews.js");


// all listing
module.exports.index = async(req,res)=>{
    let allListing = await Listing.find({});
    res.render("listing/showAll.ejs",{allListing});
};

// new listing form
module.exports.createListingForm = (req,res)=>{
    res.render("listing/new.ejs");
}

 
// add new listing + uploading image
module.exports.createListing = async(req,res)=>{
    const list =  new Listing(req.body.listing);
    list.owner = req.user;
    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename;
        list.image = {url , filename};
    }
    await list.save();
    req.flash("success","New listing is added");
    res.redirect("/listing");
};

// show specific listing
module.exports.specificListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id)
                        .populate({ path:"review", 
                                    populate:{path:"author"}})
                        .populate("owner");
    res.render("listing/show.ejs" , {listing});
};

// edit listing form [ directly check login and owner ]
module.exports.editListingForm = async(req,res)=>{
       let {id} = req.params;
        let listing = await Listing.findById(id);
        let originalUrl = listing.image.url;
        originalUrl = originalUrl.replace("/upload", "/upload/h_180,w_210");
        res.render("listing/edit.ejs", {listing, originalUrl}); 
};

// update listing
module.exports.updateListing = async(req,res)=>{
    console.log("body" ,req.body.listing);
    console.log("file", req.file);
    let {id} = req.params;
    let list = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename;
        list.image = {url , filename};
        await list.save();
    }
    req.flash("success","Successfully updated");
    res.redirect(`/listing/${id}`);
};

// delete listing + delete related reviews
module.exports.deleteListing = async(req,res)=>{
    let {id} = req.params;
    let delList = await Listing.findByIdAndDelete(id);
    if(delList.review.length){
        await Review.deleteMany({_id : {$in: delList.review}});
    }
    req.flash("success","Listing is deleted");
    res.redirect("/listing");
};

//filter options route
module.exports.filterOption = async(req,res)=>{
    let {option} = req.params;
    let allListing = await Listing.find({category:option});
    console.log(allListing);
    res.render("listing/showAll.ejs",{allListing}); 
}
