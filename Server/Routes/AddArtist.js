const Artist = require("../models/Artist");
const express = require("express");
const router = express.Router();
/////////////////////////////////////////
router.post("/AddArtist", async (req, res) => {
  try {
    let AddArtist = await Artist.findOne({ Artist_Name: req.body.Artist_Name });
    if (AddArtist) {
      return res
        .status(400)
        .json({ success: false, message: "this Artist is already in List" });
    }
    AddArtist = await new Artist({
      Artist_Name: req.body.Artist_Name,
      DOB: req.body.DOB,
      Bio: req.body.Bio,
    });
    AddArtist.save();
    res.json({ message: "Artist added succesfully ", data: AddArtist });
  } catch (error) {
    console.error(error);
    res.status(500).send("internal server error");
  }
});
/////////////////////////////////////////
router.get("/getAllArtists", async (req, res) => {
  try {
    let getAllArtists = await Artist.find();
    if (getAllArtists == "") {
      return res.json({
        message: "Artist not found",
        success: false,
        data: getAllArtists,
      });
    } else {
      return res.json({
        message: "success",
        success: true,
        data: getAllArtists,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});
////////////////////////////////////////////////////////
module.exports = router;
