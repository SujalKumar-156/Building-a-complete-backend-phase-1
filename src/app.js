import express from "express";
import cors from "cors";
// cors is something which needs to handle in backend

// Since all the express related stuff happening in here we will use cookie parser here
import cookieParser from "cookie-parser";

const app = express();
app.get("/", (req, res) => {
  res.send("Welcome to basecampy!");
});

// Explaining the above code in our terms
app.get("/instagram", (req, res) => {
  res.send("This is an insta page");
});
// If we start the server it will first said hello world if we click on the link given it will go to hello world now if we add /instagram to end of url it will say this is an insta page

// Basic configurations

// Now we will tackle cors(Cross origin resource sharing)
// We will be sending data in json size limit of 16kb standard limit
// And sending it via the url so we have to take care of url encoder as well as for instance it converts the spaces to % in the url and more
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// We want to serve static assests from the images folder in public
app.use(express.static("public"));
// Now we can serve images

app.use(cookieParser());

// CORS configuration now
app.use(
  cors({
    // if there is , it will split into array
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    // provided port number is of vite
    // Required credentials
    credentials: true,
    // Methods which are we supportin
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// usually importing of healthcheck is done after the configuration of everything
// In video place is little bit different
// import routes
// BE CAREFUL WHILE IMPORTING IT FROM ROUTES ONLY AND YOU CAN CLICK ON healthCheckRouter WHILE PRESING CTRL TO SEE WHERE IT IS FROM
import healthCheckRouter from "./routes/healthcheck.routes.js";
// where we want to serve it is healthcheck router by use another syntax of middleware
// Once someone will hit this url then then below healthCheckRouter will take over
app.use("/api/v1/healthcheck", healthCheckRouter);

import authRouter from "./routes/auth.routes.js";
app.use("/api/v1/auth", authRouter);
// IN this we remove the healthcheck and just added the auth instead of that because in prd

export default app;
