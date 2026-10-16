const mongoose = require("mongoose");
const Listing = require("../model/listing.js");
const initdata = require("./data.js");

main()
.then(()=>console.log("connected"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/travelNest');
}

let initdataBase = async() =>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,owner:"6ab34853a6e18d3ad697c6de"}));
    console.log(initdata.data);
    await Listing.insertMany(initdata.data);
};

initdataBase();
