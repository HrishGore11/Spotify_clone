const mongoose = require("mongoose");
const ArtistSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  Bio: {
    type: String,
  },
});
const Artist = mongoose.model("Artist", ArtistSchema);
module.exports = Artist;
