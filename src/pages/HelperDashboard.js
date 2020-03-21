import React from "react";
import Protected from "../components/protected";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  Paper,
  Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";
import firebase from "../firebase";
import { useSession } from "../hooks/useSession";
import GoogleMapReact from "google-map-react";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  paper: {
    margin: 10,
    marginTop: 70,
    paddingBottom: 10,
    color: "#333333"
  },
  list: {
    marginBottom: theme.spacing(2)
  },
  subheader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  },
  title: {
    fontFamily: "Oswald, sans-serif",
    fontWeight: 700
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

export default function HelperDashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [user, userProfile] = useSession();
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(history.push("/"));
  };
  return (
    <Protected>
      <div className={classes.root}>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Fique em casa
            </Typography>
            <IconButton edge="end" color="inherit" onClick={logout}>
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <div style={{ height: "100vh", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyCeRf40ZoeEaFnmDbsElz8TvIN--YpzJt8"
                }}
                defaultCenter={{
                  lat: -22.231212,
                  lng: -54.8034424
                }}
                defaultZoom={13}
              ></GoogleMapReact>
            </div>
          </Grid>
        </Grid>
        {/* <AppBar position="fixed" color="secondary" className={classes.appBar}>
          <Toolbar>
            <Fab
              color="secondary"
              aria-label="add"
              className={classes.fabButton}
            >
              <AddIcon />
            </Fab>
            <div className={classes.grow} />
            <IconButton edge="end" color="inherit" onClick={logout}>
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar> */}
      </div>
    </Protected>
  );
}
