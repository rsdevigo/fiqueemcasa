import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";
import Logo from "../components/logo";
import WarningIcon from "@material-ui/icons/Warning";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main
  }
}));

export default function BlockedWarning() {
  const classes = useStyles();
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
