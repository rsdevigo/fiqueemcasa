import React from "react";
import { useState } from "react";
import firebase from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { Grid, Typography, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../components/logo";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main
  },
  desc: {
    fontWeight: 700,
    fontSize: "1rem",
    paddingRight: "1.8rem",
    paddingLeft: "1.8rem",
    marginTop: "1.6rem"
  },
  formContainer: {
    padding: "10px"
  },
  inputs: {
    marginBottom: "1.18rem"
  },
  actionButtons: {
    fontSize: "1.3rem",
    marginBottom: "2.18rem"
  }
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [user, initialising, error] = useAuthState(firebase.auth());
  const [state, setState] = useState({
    email: "",
    password: "",
    validationerror: {
      email: {
        error: false,
        message: ""
      },
      password: {
        error: false,
        message: ""
      }
    }
  });
  const handleChangeInput = prop => event => {
    setState({ ...state, [prop]: event.target.value });
  };

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .catch(e => {
        console.log(e);
      });
  };
  const logout = () => {
    firebase.auth().signOut();
  };

  if (initialising) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <p>Current User: {user.email}</p>
        <button onClick={logout}>Log out</button>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Logo />
        <Grid item xs={12} className={classes.formContainer}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="filled"
              fullWidth={true}
              color="secondary"
              className={classes.inputs}
              type="email"
              error={state.validationerror.email.error}
              onChange={handleChangeInput("email")}
              helperText={
                state.validationerror.email.error
                  ? state.validationerror.email.message
                  : ""
              }
              value={state.email}
            />
            <TextField
              id="outlined-basic"
              label="Senha"
              variant="filled"
              fullWidth={true}
              color="secondary"
              className={classes.inputs}
              type="password"
              onChange={handleChangeInput("password")}
              value={state.password}
            />
            <Button
              variant="contained"
              size="medium"
              fullWidth={true}
              color="secondary"
              className={classes.actionButtons}
              onClick={login}
            >
              Entrar
            </Button>
            <Button
              variant="contained"
              size="medium"
              fullWidth={true}
              color="secondary"
              className={classes.actionButtons}
              onClick={() => {
                history.push("/");
              }}
            >
              Voltar
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
