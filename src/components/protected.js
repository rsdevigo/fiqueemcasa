import React from "react";
import useUserProfile from "../hooks/useUserProfile";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "./logo";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main
  }
}));

export default function Protected(props) {
  const [error, loading, userProfile, user] = useUserProfile();
  const classes = useStyles();
  if (loading) {
    return (
      <div className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Logo />
          <Typography variant="h6">Buscando sessão salva.</Typography>
        </Grid>
      </div>
    );
  }

  if (user == null || error) {
    return <Redirect to="/login" />;
  }

  if (user && userProfile && !userProfile.exists) {
    return <Redirect to="/completeregister" />;
  }

  if (user && userProfile && userProfile.get("blocked")) {
    return <Redirect to="/blockedwarning" />;
  }
  return <div>{props.children}</div>;
}
