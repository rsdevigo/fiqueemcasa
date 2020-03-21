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

export default function Unprotected(props) {
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

  if (user && userProfile && !userProfile.exists) {
    return <Redirect to="/completeregister" />;
  }

  if (user && userProfile && userProfile.get("blocked")) {
    return <Redirect to="/blockedwarning" />;
  } else if (user && userProfile && !userProfile.get("blocked")) {
    return userProfile.get("user_category") === "helper" ? (
      <Redirect to="/helperdashboard" />
    ) : (
      <Redirect to="/needdashboard" />
    );
  }

  return <div>{props.children}</div>;
}
