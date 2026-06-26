import mongoose from "mongoose";

// getting-started.js
// const mongoose = require('mongoose');
//  Instead of above we used import

// main().catch((err) => console.log(err));

async function connectDB() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test",
    );
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error", error);
    process.exit(1);
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Arrow function of above is like this
// const connectDB = async () =>{}

export default connectDB;
