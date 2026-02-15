const mongoose = require("mongoose");
const initData = require('./init/data.js');
const Listing = require('./models/listing.js');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    console.log("Connecting to DB...");
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");
    } catch (err) {
        console.error("Connection Failed:", err);
        process.exit(1);
    }

    console.log("Clearing existing data...");
    await Listing.deleteMany({});

    console.log("Inserting new data...");
    await Listing.insertMany(initData.data);
    console.log("Data initialized successfully");

    const count = await Listing.countDocuments();
    console.log(`Current listing count: ${count}`);

    await mongoose.disconnect();
    console.log("Disconnected. Exiting.");
}

main().catch(err => {
    console.error("Fatal Error:", err);
    process.exit(1);
});
