import React from "react";
import Protected from "../components/protected";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import firebase from "../firebase";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main
  }
}));

export default function HelperDashboard() {
  const classes = useStyles();
  const history = useHistory();
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(history.push("/"));
  };
  return (
    <div>
      <Protected>
        <div className={classes.root}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
              <h1>HelperDashboard</h1>
              <Button
                variant="contained"
                size="large"
                fullWidth={true}
                color="secondary"
                className={classes.actionButtons}
                onClick={logout}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </div>
      </Protected>
    </div>
  );
}
