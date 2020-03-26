import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";
import Logo from "../components/logo";
import WarningIcon from "@material-ui/icons/Warning";
import useUserProfile from "../hooks/useUserProfile";
import { Redirect } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export default function BlockedWarning() {
  const classes = useStyles();
  const [error, loading, userProfile, user] = useUserProfile();
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

  if (user && userProfile && !userProfile.get("blocked")) {
    return userProfile.get("user_category") === "helper" ? (
      <Redirect to="/helperdashboard" />
    ) : (
      <Redirect to="/needdashboard" />
    );
  }

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Logo />
        <Grid item xs={12} style={{ margin: "3px" }}>
          <Typography variant="h4" align="center">
            Seu cadastro se encontra bloqueado.
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ margin: "3px" }}>
          <Typography paragraph={true} align="center">
            Nossa equipe de moderadores entrará em contato para desbloquear o
            seu cadastro.
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ margin: "3px" }}>
          <Typography paragraph={true} align="center">
            <WarningIcon style={{ fontSize: 40, color: "#ffb74d" }} />
          </Typography>
          <Typography paragraph={true} align="center">
            Lembre-se ajude ou peça ajuda somente em caso de necessidade
            extrema. Não coloque você e nem outra pessoa em risco.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
