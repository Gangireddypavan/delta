const path = require("path");
if (process.env.NODE_ENV != "production") {
  require('dotenv').config({ path: path.join(__dirname, "../.env") });
}


const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    const ownerId = "652d0081ae547c5d37e56b5f";
    const enrichedData = initData.data.map((obj) => ({
      ...obj,
      owner: ownerId,
    }));
    await Listing.insertMany(enrichedData);
    console.log("Data was initialized successfully");
  } catch (err) {
    console.error("Initialization error:", err);
  }
};



initDB().then(() => {
  mongoose.connection.close();
});
