const express = require("express");
const router = express.Router();
const ExpressErr = require("../utils/ExpressErr.js");
const {isLogin , isOwner, validateResData } = require("../middleware.js");
// file(image) part
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
const listingController = require("../controller/listing.js");

router.route("/")
.get( listingController.index)  // all listing
.post( isLogin ,validateResData, upload.single("listing[image][url]"), listingController.createListing); // add new listing + uploading image

// new listing form
router.get("/new", isLogin , listingController.createListingForm);

// edit listing form [ directly check login and owner ]
router.get("/:id/edit", isLogin, isOwner, listingController.editListingForm );

router.route("/:id")
.get(listingController.specificListing) // show specific listing
.put(isLogin, isOwner, validateResData, upload.single("listing[image][url]"),listingController.updateListing ) // update listing
.delete(isLogin, isOwner, listingController.deleteListing);  // delete listing + delete related reviews

//filter options route
router.get("/category/:option",listingController.filterOption);

module.exports = router;