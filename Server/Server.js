const express = require("express");
const app = express();
const Port = process.env.Port || 9092;
app.use(express.urlencoded({ extended: false }));
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
const Path = require("path");
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/Spotify/auth", require("./Routes/auth"));
app.use("/Spotify", require("./Routes/AddSongs"));
app.use("/Spotify", require("./Routes/AddArtist"));

Mongoose.connect(
  "mongodb+srv://Hrishi:vy0QW1DDc3zdlZHd@cluster0.gdsb5d1.mongodb.net/?retryWrites=true&w=majority"
)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log("error", error);
  });

//vy0QW1DDc3zdlZHd
app.use(express.static(Path.resolve(__dirname, "public")));
app.listen(Port, () => {
  console.log("Server running at Port " + Port);
});
