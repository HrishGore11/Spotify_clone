import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
// import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "@mui/material";
import Modal from "@mui/material/Modal";
export default function Home() {
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/Login");
    }

    showSongs();
    showArtists();
  }, []);

  const [ShowSongs, setShowSongs] = useState([]);
  const [ShowArtists, setShowArtists] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(2);
  const [Data, setData] = useState({});
  const handleOpen = (rows) => {
    console.log(rows);
    setOpen(true);
    setData(rows);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //////////////////////////////To Show  All Songs:

  const showSongs = async () => {
    await axios
      .get("http://localhost:9092/Spotify/getAllSongs", {
        headers: {
          AUTHORIZATION: localStorage.getItem("token"),
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMTk5OTY1MzcxNDg3YjBlY2UwNjdjIn0sImlhdCI6MTY1ODk1MjEwNX0.ouTQH7jWPoR2IJKDYVBnGWAJz2xikWdJ3lRHxlOoswY",
        },
      })
      .then((data) => {
        setShowSongs(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(ShowSongs);
  //////////////////////////////////////////////// To Show uploaded Artist

  const showArtists = () => {
    axios
      .get("http://localhost:9092/Spotify/getAllArtists", {
        headers: {
          AUTHORIZATION: localStorage.getItem("token"),
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlMTk5OTY1MzcxNDg3YjBlY2UwNjdjIn0sImlhdCI6MTY1ODk1MjEwNX0.ouTQH7jWPoR2IJKDYVBnGWAJz2xikWdJ3lRHxlOoswY",
        },
      })
      .then((data) => {
        setShowArtists(data.data.data);
        console.log(ShowArtists);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  return (
    <div>
      <Grid
        container
        spacing={3}
        sx={{ marginLeft: 5, marginTop: 2, marginBottom: 1 }}
      >
        <Grid xs={10}>
          <h2>Top 10 Songs</h2>
        </Grid>
        <Grid xs={2}>
          <Button variant="outlined">
            {" "}
            <Link href="/AddSong" color="inherit">
              + ADD Song
            </Link>
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box11">
          <div className="css-15m7mkq1">
            <h4 class="MuiTypography-root MuiTypography-h4 css-1139jqi1">
              Edit Song Details
            </h4>
          </div>
          <div className="form-div11">
            <form>
              <div className="form-div21">
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  {/* <TextField
                    fullWidth
                    // id="input-with-sx"
                    label="Song Name"
                    variant="standard"
                    id="Key"
                    name="Key"
                    // onChange={onChange}
                  /> */}
                  <StyledRating
                    name="customized-color"
                    defaultValue={2}
                    // getLabelText={(value: Number) =>
                    //   `${value} Heart${value !== 1 ? "s" : ""}`
                    // }
                    // value={rows.Rating}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    precision={0.5}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  />
                </Box>
              </div>
              <div class="MuiBox-root css-1id64jh1">
                <button
                  class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth MuiButtonBase-root css-oagsia"
                  tabindex="0"
                  onClick={(e) => {
                    e.preventDefault();
                    // Verify(
                    //   Data._id,
                    //   Data.filePath,
                    //   Data.fileType,
                    //   Data.fileKey,
                    //   Key
                    // );
                  }}
                >
                  Download file
                  {/* <span class="MuiTouchRipple-root css-w0pj6f"></span> */}
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>SongCover</StyledTableCell>
              <StyledTableCell>SongName</StyledTableCell>
              <StyledTableCell>Date of Release</StyledTableCell>
              <StyledTableCell>Artists</StyledTableCell>
              <StyledTableCell>Ratings</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ShowSongs.reverse().map((rows) => (
              <StyledTableRow key={ShowSongs.id}>
                <CardMedia
                  component="img"
                  sx={{ width: 151, height: 140 }}
                  image={`${rows.Cover}`}
                  alt="green iguana"
                />
                <StyledTableCell>{rows.Song_Name}</StyledTableCell>
                <StyledTableCell>{rows.DOR}</StyledTableCell>
                <StyledTableCell>{rows.Artists.toString()}</StyledTableCell>
                <StyledTableCell>
                  <StyledRating
                    name="customized-color"
                    defaultValue={2}
                    // getLabelText={(value: Number) =>
                    //   `${value} Heart${value !== 1 ? "s" : ""}`
                    // }
                    value={rows.Rating}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    precision={0.5}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  />
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => handleOpen(rows)}
                  >
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    // onClick={() => deleteData(rows._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        spacing={3}
        sx={{ marginLeft: 5, marginTop: 2, marginBottom: 1 }}
      >
        <Grid xs={10}>
          <h2>Top 10 Artist</h2>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Artist_Name</StyledTableCell>
              <StyledTableCell>DOB</StyledTableCell>
              <StyledTableCell>Artist_Bio</StyledTableCell>
              <StyledTableCell>Rating</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ShowArtists.reverse().map((Artists) => (
              <StyledTableRow key={ShowArtists.id}>
                <StyledTableCell>{Artists.Artist_Name}</StyledTableCell>
                <StyledTableCell>{Artists.DOB}</StyledTableCell>
                <StyledTableCell>{Artists.Bio}</StyledTableCell>
                <StyledTableCell>
                  <StyledRating
                    name="customized-color"
                    defaultValue={2}
                    getLabelText={(value: number) =>
                      `${value} Heart${value !== 1 ? "s" : ""}`
                    }
                    precision={0.5}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
