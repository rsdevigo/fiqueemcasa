import React from "react";
import { useState } from "react";
import Protected from "../components/protected";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Snackbar,
  Modal
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";
import firebase from "../firebase";
import { useSession } from "../hooks/useSession";
import { useCollection } from "react-firebase-hooks/firestore";
import GoogleMapReact from "google-map-react";
import CallInfoCard from "../components/call_info_card";
import CallAcceptedCard from "../components/call_accepted_card";

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
    fontWeight: 700,
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

export default function HelperDashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [viewCall, setViewCall] = useState(null);
  const [user, userProfile] = useSession();
  const [mycall, mycallLoading, mycallError] = useCollection(
    firebase
      .firestore()
      .collection("calls_actives")
      .where(
        "helper_uid",
        "==",
        firebase.firestore().doc("/users_profiles/" + user.uid)
      ),
    {
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(history.push("/"));
  };
  const handleApiLoaded = (map, maps) => {
    let markers = [];
    markers.map(marker => {
      marker.setMap(null);
    });
    firebase
      .firestore()
      .collection("calls_actives")
      .where("status", "==", "pending")
      .onSnapshot(querySnapshot => {
        markers.map(marker => {
          marker.setMap(null);
        });
        markers = [];
        querySnapshot.forEach(call => {
          var marker = new maps.Marker({
            position: { lat: call.get("lat"), lng: call.get("long") },
            map: map
          });
          marker.addListener("click", function(e) {
            setOpen(true);
            setViewCall(call);
          });
          markers.push(marker);
        });
      });
  };
  const handleClose = () => {
    setOpen(false);
    setViewCall(null);
  };

  const handleAccept = () => {
    setOpen(false);
    setViewCall(null);
    setOpenSnackBar(true);
  };

  return (
    <Protected>
      <div className={classes.root}>
        <AppBar position="fixed" color="primary">
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
            {mycallLoading && (
              <Typography variant="h6" align="center" style={{ marginTop: 70 }}>
                Verificando se você possui um pedido de ajuda em aberto
              </Typography>
            )}
            {!mycallLoading && (
              <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: ""
                  }}
                  defaultCenter={{
                    lat: -22.231212,
                    lng: -54.8034424
                  }}
                  defaultZoom={13}
                  yesIWantToUseGoogleMapApiInternals={true}
                  onGoogleApiLoaded={({ map, maps }) =>
                    handleApiLoaded(map, maps)
                  }
                ></GoogleMapReact>
              </div>
            )}
            <Snackbar
              open={openSnackBar}
              autoHideDuration={6000}
              onClose={() => {
                setOpenSnackBar(false);
              }}
            >
              <Alert
                onClose={() => {
                  setOpenSnackBar(false);
                }}
                severity="success"
              >
                Pedido de ajuda aceito. Você é uma pessoa fora do comum,
                obrigado.
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar>
            <Typography
              variant="h6"
              component="h6"
              align="center"
              className={classes.grow}
            >
              Obrigado{" "}
              {userProfile && userProfile.exists && userProfile.get("name")}
            </Typography>
          </Toolbar>
        </AppBar>
        <CallInfoCard
          open={open}
          handleClose={handleClose}
          user={user}
          call={viewCall}
          onAccept={handleAccept}
        />
        <Modal open={!mycallLoading && !mycall.empty} disableBackdropClick>
          <div>
            {!mycallLoading && !mycall.empty && (
              <CallAcceptedCard call={mycall.docs[0]} />
            )}
          </div>
        </Modal>
      </div>
    </Protected>
  );
}
