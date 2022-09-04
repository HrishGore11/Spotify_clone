// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./home.css";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import Rating from "@mui/material/Rating";

// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import DeleteIcon from "@mui/icons-material/Delete";
// import IconButton from "@mui/material/IconButton";
// import Modal from "@mui/material/Modal";
// import TextField from "@mui/material/TextField";
// import CardMedia from "@mui/material/CardMedia";
// // import download from "downloadjs";
// const FormData = require("form-data");
// export default function AddSong() {
//   let navigate = useNavigate();

//   useEffect(() => {
//     if (!localStorage.getItem("token")) {
//       navigate("/Login");
//     }

//     showSongs();
//     showArtists();
//   }, []);

//   const [ShowSongs, setShowSongs] = useState([]);
//   const [ShowArtists, setShowArtists] = useState([]);
//   const [file, setFile] = useState([]);
//   const [open, setOpen] = React.useState(false);
//   const [Key, setKey] = useState(0);
//   const [Data, setData] = useState({});
//   const [Song, setSong] = useState({
//     Song_Name: "Ae Zindagi gale lagale12",
//     DOR: "15/123/1974",
//     Cover: "",
//   });
//   const [image, setImage] = useState("");
//   const [RatingValue, setRatingValue] = (React.useState < Number) | (null > 2);
//   console.log(RatingValue);

//   const RatingChange = (event, newValue) => {
//     setValue(newValue);
//     console.log(value);
//   };

//   const handleOpen = (rows) => {
//     console.log(rows);
//     setOpen(true);
//     setData(rows);
//   };
//   const onChange = (e) => {
//     setKey(parseInt(e.target.value));
//   };

//   const handleClose = () => {
//     setOpen(false);
//     console.log(typeof Key);
//     console.log(Data);
//   };

//   const onChange1 = (e) => {
//     setFile(e.target.files[0]);
//   };

//   //////////////////////////////To Show Uploaded Songs by Logged in User :

//   const showSongs = () => {
//     axios
//       .get("http://localhost:9092/Spotify/getAllSongs", {
//         headers: {
//           AUTHORIZATION: localStorage.getItem("token"),
//           // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMTk5OTY1MzcxNDg3YjBlY2UwNjdjIn0sImlhdCI6MTY1ODk1MjEwNX0.ouTQH7jWPoR2IJKDYVBnGWAJz2xikWdJ3lRHxlOoswY",
//         },
//       })
//       .then((data) => {
//         setShowSongs(data.data.data);
//         console.log(ShowSongs);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   //////////////////////////////////////////////// To Show uploaded Artist
//   const showArtists = () => {
//     axios
//       .get("http://localhost:9092/Spotify/getAllArtists", {
//         headers: {
//           AUTHORIZATION: localStorage.getItem("token"),
//           // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMTk5OTY1MzcxNDg3YjBlY2UwNjdjIn0sImlhdCI6MTY1ODk1MjEwNX0.ouTQH7jWPoR2IJKDYVBnGWAJz2xikWdJ3lRHxlOoswY",
//         },
//       })
//       .then((data) => {
//         setShowArtists(data.data.data);
//         console.log(ShowArtists);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   // ///////////////////////////Verify Key

//   const Verify = (id1, path1, mimetype1, fileKey, Key) => {
//     // console.log(id, path, mimetype);
//     if (Key === 0 || Key === "") {
//       return alert("key Field cannot be Empty");
//     } else {
//       if (fileKey !== Key) {
//         return alert("Incorrect Key");
//       } else {
//         // Downloadfile(id1, path1, mimetype1);
//         setOpen(false);
//       }
//     }
//   };
//   //////////////////////////// To Download File
//   // const Downloadfile = async (id, path, mimetype) => {
//   //   console.log(id, path, mimetype);
//   //   try {
//   //     const result = await axios.get(
//   //       "http://localhost:9046/api/downloadfile/" + `${id}`,
//   //       {
//   //         responseType: "blob",
//   //         headers: {
//   //           AUTHORIZATION: localStorage.getItem("token"),
//   //         },
//   //       }
//   //     );
//   //     const split = path.split("/");
//   //     const filename = split[split.length - 1];
//   //     const mimetype1 = mimetype.split("/");
//   //     //   setErrorMsg("");
//   //     console.log(filename);
//   //     console.log(mimetype);
//   //     console.log(__dirname);

//   //     return download(result.data, filename, mimetype);
//   //   } catch (error) {
//   //     if (error.response && error.response.status === 400) {
//   //       console.log("Error while downloading file. Try again later");
//   //     }
//   //   }
//   // };
//   //////////////////////////////To Delete File :

//   const deleteData = async (id) => {
//     try {
//       const res = await axios.delete(
//         "http://localhost:9046/api/deletefile/" + `${id}`,
//         {
//           headers: {
//             AUTHORIZATION: localStorage.getItem("token"),
//           },
//         }
//       );
//       if (res.data.message === "data has been deleted successfully") {
//         alert(res.data.message);
//         const newData = ShowSongs.filter((rows) => {
//           return rows._id !== id;
//         });
//         setShowSongs(newData);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   //////////

//   //////////////////////////////To upload Song :
//   const postimage = (e) => {
//     e.preventDefault();
//     console.log(image);
//     const image1 = new FormData();
//     image1.append("file", image);
//     image1.append("upload_preset", "Spotify_Clone");
//     image1.append("cloud_name", "rossi1494");
//     axios
//       .post("https://api.cloudinary.com/v1_1/rossi1494/image/upload", image1)
//       .then((res) => {
//         const url = res.data.url;
//         console.log(url);
//         Song.Cover = url;
//         setSong({ ...Song });
//         console.log(Song.Cover);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   //////////////////////////////upload song to backend

//   //////////////////////////////////////////

//   const uploadFile = (e) => {
//     e.preventDefault();
//     if (Song.Cover) {
//       axios
//         .post("http://localhost:9092/Spotify/AddSong", Song, {
//           headers: {
//             AUTHORIZATION: localStorage.getItem("token"),
//             // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMTk5OTY1MzcxNDg3YjBlY2UwNjdjIn0sImlhdCI6MTY1ODk1MjEwNX0.ouTQH7jWPoR2IJKDYVBnGWAJz2xikWdJ3lRHxlOoswY",
//           },
//         })
//         .then((response) => {
//           console.log(response);
//           // setrow1([...row1, response.data.data]);
//           // alert(
//           //   response.data.message,
//           //   "Your Security Key for this File is " +
//           //     `${response.data.data.fileKey}`
//           // );
//           // console.log(
//           //   alert(
//           //     response.data.message,
//           //     "Your Security Key for this File is " +
//           //       `${response.data.data.fileKey}`
//           //   )
//           // );
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } else {
//       console.log(Song.Cover);
//     }
//   };

//   const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//     },
//   }));
//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.action.hover,
//     },
//     // hide last border
//     "&:last-child td, &:last-child th": {
//       border: 0,
//     },
//   }));
//   const StyledRating = styled(Rating)({
//     "& .MuiRating-iconFilled": {
//       color: "#ff6d75",
//     },
//     "& .MuiRating-iconHover": {
//       color: "#ff3d47",
//     },
//   });

//   return (
//     <div>
//       <Card sx={{ minWidth: 275 }}>
//         <CardContent>
//           <form onSubmit={uploadFile} encType="multipart/form-data">
//             <label for="file">BrowseFile</label>
//             <input
//               type="file"
//               class="form-control"
//               name="file"
//               required
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//             <br></br>
//           </form>{" "}
//         </CardContent>
//         <CardActions>
//           <Button size="small" type="submit" value="submit" onClick={postimage}>
//             Upload File
//           </Button>{" "}
//           <Button
//             size="small"
//             type="submit"
//             value="submit"
//             onClick={uploadFile}
//           >
//             Upload File
//           </Button>{" "}
//         </CardActions>
//       </Card>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box className="box11">
//           <div className="css-15m7mkq1">
//             <h4 class="MuiTypography-root MuiTypography-h4 css-1139jqi1">
//               Enter Key To Download a File
//             </h4>
//           </div>
//           <div className="form-div11">
//             <form>
//               <div className="form-div21">
//                 <Box sx={{ display: "flex", alignItems: "flex-end" }}>
//                   <TextField
//                     fullWidth
//                     // id="input-with-sx"
//                     label="Security Key"
//                     variant="standard"
//                     id="Key"
//                     name="Key"
//                     onChange={onChange}
//                   />
//                 </Box>
//               </div>
//               <div class="MuiBox-root css-1id64jh1">
//                 <button
//                   class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth MuiButtonBase-root css-oagsia"
//                   tabindex="0"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     Verify(
//                       Data._id,
//                       Data.filePath,
//                       Data.fileType,
//                       Data.fileKey,
//                       Key
//                     );
//                   }}
//                 >
//                   Download file
//                   {/* <span class="MuiTouchRipple-root css-w0pj6f"></span> */}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </Box>
//       </Modal>
//       <h3>Top !0 Songs</h3>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>SongCover</StyledTableCell>
//               <StyledTableCell>SongName</StyledTableCell>
//               <StyledTableCell>Date of Release</StyledTableCell>
//               <StyledTableCell>Artists</StyledTableCell>

//               <StyledTableCell>Ratings</StyledTableCell>
//               <StyledTableCell>Actions</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {ShowSongs.reverse().map((rows) => (
//               <StyledTableRow key={ShowSongs.id}>
//                 <CardMedia
//                   component="img"
//                   sx={{ width: 151, height: 140 }}
//                   image={`${rows.Cover}`}
//                   alt="green iguana"
//                 />
//                 <StyledTableCell>{rows.Song_Name}</StyledTableCell>
//                 <StyledTableCell>{rows.DOR}</StyledTableCell>
//                 <StyledTableCell>{rows.Song_Name}</StyledTableCell>

//                 <StyledTableCell>
//                   <StyledRating
//                     name="customized-color"
//                     defaultValue={2}
//                     getLabelText={(value: number) =>
//                       `${value} Heart${value !== 1 ? "s" : ""}`
//                     }
//                     precision={0.5}
//                     icon={<FavoriteIcon fontSize="inherit" />}
//                     emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
//                   />
//                 </StyledTableCell>
//                 {/* <StyledTableCell>{rows.uploadedby.Name}</StyledTableCell>
//                 <StyledTableCell>{rows.fileType}</StyledTableCell>
//                 <StyledTableCell>{rows.fileKey}</StyledTableCell> */}
//                 <IconButton
//                   aria-label="delete"
//                   size="large"
//                   onClick={() => handleOpen(rows)}
//                 >
//                   <FileDownloadIcon />
//                 </IconButton>

//                 <IconButton
//                   aria-label="delete"
//                   size="large"
//                   onClick={() => deleteData(rows._id)}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <br />
//       <h3>Top 10 Artists</h3>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Artist_Name</StyledTableCell>
//               <StyledTableCell>DOB</StyledTableCell>
//               <StyledTableCell>Artist_Bio</StyledTableCell>
//               <StyledTableCell>Rating</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {ShowArtists.reverse().map((Artists) => (
//               <StyledTableRow key={ShowArtists.id}>
//                 <StyledTableCell>{Artists.Artist_Name}</StyledTableCell>
//                 <StyledTableCell>{Artists.DOB}</StyledTableCell>
//                 <StyledTableCell>{Artists.Bio}</StyledTableCell>
//                 <StyledTableCell>
//                   <StyledRating
//                     name="customized-color"
//                     defaultValue={2}
//                     getLabelText={(value: number) =>
//                       `${value} Heart${value !== 1 ? "s" : ""}`
//                     }
//                     precision={0.5}
//                     icon={<FavoriteIcon fontSize="inherit" />}
//                     emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
//                   />
//                 </StyledTableCell>

//                 {/* <StyledTableCell>{rows.uploadedby.Name}</StyledTableCell>
//                 <StyledTableCell>{rows.fileType}</StyledTableCell>
//                 <StyledTableCell>{rows.fileKey}</StyledTableCell> */}
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

import * as React from "react";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./addSong.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export default function AddSong() {
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

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [value, setValue] = React.useState(null);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
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
                sx={{ bgcolor: "white", width: 500, marginRight: 4 }}
                label="Song Name"
                id="margin-normal"
                margin="normal"
              ></TextField>
              <br />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Release"
                  value={value}
                  size="small"
                  sx={{ bgcolor: "White" }}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="Coverimage">
              <label>ADD Cover Image :</label>
              <input type="file" />
            </div>

            <div>
              <label>ADD Artists :</label>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                size="small"
                sx={{
                  bgcolor: "white",
                  width: 500,
                  marginLeft: 10,
                }}
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
              <Button
                className="Cancelandsavebtn"
                variant="outlined"
                color="primary"
              >
                + Add Artist
              </Button>
            </div>
            <div className="Cancelandsavebtn">
              <Button
                className="Cancelandsavebtn"
                variant="outlined"
                color="error"
              >
                Cancel
              </Button>

              <Button
                className="Cancelandsavebtn"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
}
