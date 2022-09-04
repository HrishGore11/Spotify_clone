const Songs = require("../models/Songs");
const express = require("express");
const router = express.Router();
const auth_user = require("../middleware/authuser");
//////////////////////////////////////////
router.post("/AddSong", auth_user, async (req, res) => {
  try {
    let AddSong = await Songs.findOne({ Song_Name: req.body.Song_Name });
    if (AddSong) {
      return res
        .status(400)
        .json({ success: false, message: "this Song is already exist" });
    }
    AddSong = await new Songs({
      Song_Name: req.body.Song_Name,
      DOR: req.body.DOR,
      Cover: req.body.Cover,
    });
    AddSong.save();
    res.json({ message: "Song added succesfully ", data: AddSong });
  } catch (error) {
    console.error(error);
    res.status(500).send("internal server error");
  }
});
////////////////////////////////////////////////
router.get("/getAllSongs", auth_user, async (req, res) => {
  try {
    let getAllSongs = await Songs.find();
    if (getAllSongs == "") {
      return res.json({
        message: "Songs not found",
        success: false,
        data: getAllSongs,
      });
    } else {
      return res.json({ message: "success", success: true, data: getAllSongs });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

///////////////////////////////////////////////
module.exports = router;
