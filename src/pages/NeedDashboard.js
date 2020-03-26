import React, { useState } from "react";
import Protected from "../components/protected";
import { makeStyles } from "@material-ui/core/styles";
import { useDocument } from "react-firebase-hooks/firestore";
import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  Paper,
  Typography,
  Modal,
  Snackbar,
  Button,
  CircularProgress
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";
import firebase from "../firebase";
import { useSession } from "../hooks/useSession";
import { usePosition } from "use-position";
import CallDialogWarning from "../components/call_dialog_warning";
import CallNeedCard from "../components/call_need_card";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  paper: {
    position: "absolute",
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  list: {
    marginBottom: theme.spacing(2)
  },
  container: {
    padding: 10,
    paddingTop: 70,
    paddingBottom: 10
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
    fontSize: "1.10rem"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

export default function NeedDashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [user, userProfile] = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [value, loading, error] = useDocument(
    firebase.firestore().doc("calls_actives/" + user.uid)
  );
  const {
    latitude,
    longitude,
    timestamp,
    accuracy,
    geoerror
  } = usePosition(false, { enableHighAccuracy: true });

  const openWarningModal = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const addCall = () => {
    if (!loading && !value.exists && !geoerror) {
      value.ref
        .set({
          create_date: firebase.firestore.Timestamp.now(),
          lat: latitude,
          long: longitude,
          status: "pending",
          helper_uid: null
        })
        .then(resp => {
          setOpenModal(false);
          setOpenSnackBar(true);
        });
    } else if (geoerror) {
    }
  };

  const cancelCall = () => {
    if (!loading && value.exists) {
      firebase
        .firestore()
        .collection("call_canceled")
        .add({
          call: value.data(),
          caller: firebase.firestore().doc("/users_profiles/" + value.id)
        })
        .then(() => {
          value.ref.delete();
        });
    }
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(history.push("/"));
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
              Fique em casa {userProfile && userProfile.get("name")}
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          className={classes.container}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            {!loading && !value.exists && (
              <div>
                <Typography
                  variant="h4"
                  align="center"
                  style={{ marginTop: 10 }}
                >
                  Você não possui nenhum pedido de ajuda ativo
                </Typography>
                <Typography
                  paragraph={true}
                  align="center"
                  style={{ marginTop: 10 }}
                >
                  Realize um pedido de ajuda clicando no ícone <AddIcon />{" "}
                  abaixo.
                </Typography>
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
                Pedido de ajuda criado com sucesso
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar>
            <Fab
              color="secondary"
              aria-label="add"
              className={classes.fabButton}
              onClick={openWarningModal}
              disabled={!loading && value.exists}
            >
              <AddIcon color="inherit" />
            </Fab>
            <div className={classes.grow} />
            <IconButton edge="end" color="inherit" onClick={logout}>
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      <CallDialogWarning
        open={openModal}
        onCancel={handleClose}
        onClose={handleClose}
        onAccept={addCall}
      />
      <Modal open={!loading && value.exists} disableBackdropClick>
        <div>
          {!loading && value.exists && value.get("helper_uid") && (
            <CallNeedCard call={value} />
          )}
          {!loading && value.exists && !value.get("helper_uid") && (
            <Paper className={classes.paper}>
              <Typography paragraph align="center" style={{ marginBottom: 5 }}>
                <CircularProgress align="center" />
              </Typography>

              <Typography variant="h5" align="center">
                Pedindo ajuda
              </Typography>
              <Typography paragraph align="center">
                Logo, alguém responderá o seu pedido de ajuda.
              </Typography>
              <Typography paragraph align="center">
                <Button
                  style={{ margin: "0 auto" }}
                  variant="contained"
                  size="medium"
                  onClick={cancelCall}
                >
                  Cancelar pedido de ajuda
                </Button>
              </Typography>
            </Paper>
          )}
        </div>
      </Modal>
    </Protected>
  );
}
