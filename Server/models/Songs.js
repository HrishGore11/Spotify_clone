const mongoose = require("mongoose");
const SongsSchema = new mongoose.Schema({
  Song_Name: {
    type: String,
    required: true,
  },
  DOR: {
    type: String,
    required: true,
  },
  Cover: {
    type: String,
    default: "No Photo",
  },
});
const Songs = mongoose.model("Songs", SongsSchema);
module.exports = Songs;