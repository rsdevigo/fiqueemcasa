import React from "react";
import { useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../components/logo";
import Unprotected from "../components/unprotected";
import { useHistory } from "react-router-dom";
import firebase from "../firebase";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main
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

const validateEmail = email => {
  var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  return re.test(email);
};

export default function Register(props) {
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
    setState({ ...state, [prop]: event.target.value });
  };

  const onRegister = () => {
    if (!validateEmail(state.email)) {
      setState({
        ...state,
        validationerror: {
          ...state.validationerror,
          email: {
            error: true,
            message: "Email no formato incorreto"
          }
        }
      });
      return;
    } else {
      setState({
        ...state,
        validationerror: {
          ...state.validationerror,
          email: {
            error: false,
            message: ""
          }
        }
      });
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .catch(e => {
        console.log(e);
        setState({
          ...state,
          validationerror: {
            ...state.validationerror,
            email: {
              error: true,
              message: "O email já possui um cadastro"
            }
          }
        });
      })
      .then(resp => {
        history.push("/completeregister/" + props.match.params.category);
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
              />
              <Button
                variant="contained"
                size="medium"
                fullWidth={true}
                color="secondary"
                className={classes.actionButtons}
                onClick={onRegister}
              >
                Cadastrar
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
