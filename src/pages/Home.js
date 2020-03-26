import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../components/logo";
import Unprotected from "../components/unprotected";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  desc: {
    fontWeight: 700,
    fontSize: "1rem",
    paddingRight: "1.8rem",
    paddingLeft: "1.8rem",
    marginTop: "1.6rem"
  },
  actionButtonsContainer: {
    padding: "10px"
  },
  actionButtons: {
    fontSize: "1.3rem",
    marginBottom: "2.18rem"
  }
}));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Unprotected>
      <div className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Logo />
          <Grid item xs={12} className={classes.actionButtonsContainer}>
            <Button
              variant="contained"
              size="large"
              fullWidth={true}
              color="secondary"
              className={classes.actionButtons}
              onClick={() => {
                history.push("/register/helper");
              }}
            >
              POSSO AJUDAR
            </Button>
            <Button
              variant="contained"
              size="large"
              fullWidth={true}
              color="secondary"
              className={classes.actionButtons}
              onClick={() => {
                history.push("/register/need");
              }}
            >
              QUERO AJUDA
            </Button>
            <Button
              variant="contained"
              size="large"
              fullWidth={true}
              color="secondary"
              className={classes.actionButtons}
              onClick={() => {
                history.push("/login");
              }}
            >
              JÁ POSSUO CADASTRO
            </Button>
          </Grid>
        </Grid>
      </div>
    </Unprotected>
  );
}
