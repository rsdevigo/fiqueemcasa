import React from "react";
import { useState } from "react";
import firebase from "../firebase";
import { useHistory } from "react-router-dom";
import { Grid, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../components/logo";
import Unprotected from "../components/unprotected";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: "#333333"
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

export default function Login(props) {
  const classes = useStyles();
  const history = useHistory();
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
    setState({
      ...state,
      [prop]: event.target.value,
      validationerror: {
        ...state.validationerror,
        password: {
          error: false,
          message: ""
        },
        email: {
          error: false,
          message: ""
        }
      }
    });
  };

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then(() => {
        history.push("/");
      })
      .catch(e => {
        if (e.code === "auth/wrong-password") {
          setState({
            ...state,
            validationerror: {
              ...state.validationerror,
              password: {
                error: true,
                message: "Senha incorreta"
              }
            }
          });
        }
        if (e.code === "auth/user-not-found") {
          setState({
            ...state,
            validationerror: {
              ...state.validationerror,
              email: {
                error: true,
                message: "Email não existe em nosso banco de dados"
              }
            }
          });
        }
      });
  };

  return (
    <Unprotected>
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
                error={state.validationerror.password.error}
                helperText={
                  state.validationerror.password.error
                    ? state.validationerror.password.message
                    : ""
                }
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
    </Unprotected>
  );
}
