const express = require("express");
const mongoose = require("mongoose");

const app = express();
/* Loading the environment variables from the .env file. */
require("dotenv").config();
const ActivityRouter = require("./activity.route");

const PORT = process.env.PORT || 8080;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://poddar826:Gy2ZpBP28eBlDaMp@mycluster.kzotonn.mongodb.net/test";

/* Telling the application to use the express.json() middleware. This middleware will parse the body of
any request that has a Content-Type of application/json. */
app.use(express.json());

/* This is a route handler. It is listening for a GET request to the root route of the application.
When it receives a request, it will send back a response with the string "Hello World!". */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

/* Telling the application to use the ActivityRouter for any requests that start with "/api". */
app.use("/api", ActivityRouter);

/* Connecting to the database and then starting the server. */
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, console.log("Server stated on port 8080"));
  })
  .catch((err) => {
    console.log(err);
  });
//   app.listen(PORT, console.log("Server stated on port 8080"));