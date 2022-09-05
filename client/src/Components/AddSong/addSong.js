import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./addSong.css";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Modal from "@mui/material/Modal";
export default function AddSong() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Login");
    }

    showArtistsinCheckboxes();
  }, []);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // function getStyles(name, personName, theme) {
  //   return {
  //     fontWeight:
  //       personName.indexOf(name) === -1
  //         ? theme.typography.fontWeightRegular
  //         : theme.typography.fontWeightMedium,
  //   };
  // }
  // const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [value, setValue] = useState(null);
  const [DORValue, setDORValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [Song, setSong] = useState({
    Song_Name: "",
    DOR: "",
    Cover: "",
    Artists: [],
  });
  const [Artist, setArtist] = useState({
    Artist_Name: "",
    DOB: "",
    Bio: "",
  });
  const [image, setImage] = useState("");
  const [ArtistsinCheckboxes, setArtistsinCheckboxes] = useState([]);
  //////////////////////////////////////////
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    Song.Artists = personName;
    setSong({ ...Song });
  };
  console.log(Song.Artists);

  const handleArtist = (e) => {
    setArtist({ ...Artist, [e.target.name]: e.target.value });
    console.log(Artist);
  };
  const handleOpen = () => {
    setOpen(true);
    console.log("im opened");
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onChange1 = (e) => {
    setImage(e.target.files[0]);
    console.log(e.files);
  };
  const HandleSong = (e) => {
    setSong({ ...Song, [e.target.name]: e.target.value });
    console.log(Song);
  };
  //////////////////////////////To upload image to cloudnary:
  const postimage = (e) => {
    e.preventDefault();
    console.log(image);
    const image1 = new FormData();
    image1.append("file", image);
    image1.append("upload_preset", "Spotify_Clone");
    image1.append("cloud_name", "rossi1494");
    axios
      .post("https://api.cloudinary.com/v1_1/rossi1494/image/upload", image1)
      .then((res) => {
        const url = res.data.url;
        // console.log(url);
        Song.Cover = url;
        setSong({ ...Song });
        // console.log(Song.Cover);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //////////////////////////////upload song to backend
  const uploadSong = (e) => {
    e.preventDefault();
    if (Song.Cover) {
      axios
        .post("http://localhost:9092/Spotify/AddSong", Song, {
          headers: {
            AUTHORIZATION: localStorage.getItem("token"),
            // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMTk5OTY1MzcxNDg3YjBlY2UwNjdjIn0sImlhdCI6MTY1ODk1MjEwNX0.ouTQH7jWPoR2IJKDYVBnGWAJz2xikWdJ3lRHxlOoswY",
          },
        })
        .then((response) => {
          console.log(response);
          navigate("/Home");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      window.alert("image is uploading");
    }
  };
  /////////////////////////////////////////////////Save artist
  const SaveArtist = (e) => {
    e.preventDefault();
    if (Artist) {
      axios
        .post("http://localhost:9092/Spotify/AddArtist", Artist, {
          headers: {
            AUTHORIZATION: localStorage.getItem("token"),
          },
        })
        .then((data) => {
          console.log(data.data.data);
          if (data.data.message === "Artist added succesfully") {
            window.alert("Artist added succesfully");
          }
          handleClose();
          showArtistsinCheckboxes();
        })
        .catch((err) => {
          console.log(err.response.data.message);
          const message = err.response.data.message;
          window.alert(message);
        });
    } else {
      window.alert("fill the required Values");
    }
  };
  //////////////////////////////////////////////////////// to show artist in check boxes
  const showArtistsinCheckboxes = () => {
    axios
      .get("http://localhost:9092/Spotify/getAllArtists", {
        headers: {
          AUTHORIZATION: localStorage.getItem("token"),
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMTk5OTY1MzcxNDg3YjBlY2UwNjdjIn0sImlhdCI6MTY1ODk1MjEwNX0.ouTQH7jWPoR2IJKDYVBnGWAJz2xikWdJ3lRHxlOoswY",
        },
      })
      .then((data) => {
        setArtistsinCheckboxes(data.data.data);
        console.log(ArtistsinCheckboxes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box11">
          <div className="css-15m7mkq1">
            <h4 class="MuiTypography-root MuiTypography-h4 css-1139jqi1">
              Add New Artist
            </h4>
          </div>
          <div className="form-div11">
            <form onSubmit={SaveArtist}>
              <div className="form-div21">
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <TextField
                    fullWidth
                    // id="input-with-sx"
                    label="Artist Name"
                    variant="standard"
                    id="Key"
                    name="Artist_Name"
                    onChange={handleArtist}
                    value={Artist.Artist_Name}
                  />
                </Box>
              </div>
              <div className="form-div21">
                <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                  <DatePicker
                    label="Date of Birth"
                    value={value}
                    fullWidth
                    size="small"
                    sx={{ bgcolor: "White" }}
                    onChange={(newValue) => {
                      setValue(newValue.$d);
                      Artist.DOB = newValue.$d.toDateString();
                      setArtist({ ...Artist });
                      console.log(Artist);
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>

              <div className="form-div21">
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="Artist Bio"
                  multiline
                  rows={4}
                  name="Bio"
                  onChange={handleArtist}
                  value={Artist.Bio}
                />
              </div>
              <div class="MuiBox-root css-1id64jh1">
                <button
                  type="Submit"
                  class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth MuiButtonBase-root css-oagsia"
                  tabindex="0"
                >
                  Save Artist
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Box sx={{ bgcolor: "#f6f7c9" }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ marginLeft: 3, marginTop: 3 }}
            >
              Adding a New Song
            </Typography>
            <div className="box1div">
              <div className="SongandDor">
                <TextField
                  size="small"
                  sx={{ width: 500, marginRight: 4 }}
                  label="Song Name"
                  id="margin-normal"
                  margin="normal"
                  name="Song_Name"
                  onChange={HandleSong}
                  value={Song.Song_Name}
                ></TextField>
                <br />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Release"
                    value={DORValue}
                    size="small"
                    sx={{ bgcolor: "White" }}
                    onChange={(DORValue1) => {
                      setDORValue(DORValue1.$d);
                      Song.DOR = DORValue1.$d.toDateString();
                      setSong({ ...Song });
                      console.log(Song);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <div className="Coverimage">
                <label>ADD Cover Image :</label>
                <input
                  type="file"
                  class="form-control"
                  name="image"
                  required
                  onChange={onChange1}
                />
                <Button
                  size="small"
                  type="submit"
                  value="submit"
                  onClick={postimage}
                  variant="contained"
                  color="primary"
                >
                  Upload Cover
                </Button>{" "}
              </div>

              <div>
                <label>ADD Artists :</label>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  size="small"
                  sx={{
                    width: 500,
                    marginLeft: 10,
                  }}
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {ArtistsinCheckboxes.map((name) => (
                    <MenuItem key={name.id} value={name.Artist_Name}>
                      <Checkbox
                        checked={personName.indexOf(name.Artist_Name) > -1}
                      />
                      <ListItemText primary={name.Artist_Name} />
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  className="Cancelandsavebtn"
                  variant="outlined"
                  color="primary"
                  onClick={handleOpen}
                >
                  + Add Artist
                </Button>
              </div>
              <div className="Cancelandsavebtn">
                <Button
                  className="Cancelandsavebtn"
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    navigate("/Home");
                  }}
                >
                  Cancel
                </Button>

                <Button
                  className="Cancelandsavebtn"
                  variant="contained"
                  color="primary"
                  onClick={uploadSong}
                >
                  Save
                </Button>
              </div>
            </div>
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
}
