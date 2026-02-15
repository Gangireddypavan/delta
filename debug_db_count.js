const mongoose = require("mongoose");
const Listing = require("./models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    const count = await Listing.countDocuments();
    console.log(`Number of listings: ${count}`);

    if (count > 0) {
        const sample = await Listing.findOne();
        console.log("Sample listing:", JSON.stringify(sample, null, 2));
    }

    mongoose.connection.close();
}

main().catch(err => console.log(err));
