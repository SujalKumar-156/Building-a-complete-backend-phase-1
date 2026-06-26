import dotenv from "dotenv";
// import express from "express";
// Since we are importing app and it has express imported then we can comment out the import express here
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

// This codes are given by express we have modified it little bit
// We will import it using import keyword
// const express = require("express");

// Now we will comment out this const app part cause we will importing that from our app.js
// const app = express();
// Port is something if you declared like this it's not gonna work in longer run
// const port = 3000;
const port = process.env.PORT || 3000;

// ON successful listening on port
// Rn it was listening to port everytime but i want only that 1 time when it connects
// SO we move it to then of connectdb using callback
// app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`);
// });

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
    process.exit(1);
  });
