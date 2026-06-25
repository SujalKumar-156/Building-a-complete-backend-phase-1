import express from "express";

const app = express();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Explaining the above code in our terms
app.get("/instagram", (req, res) => {
  res.send("This is an insta page");
});
// If we start the server it will first said hello world if we click on the link given it will go to hello world now if we add /instagram to end of url it will say this is an insta page

export default app;
