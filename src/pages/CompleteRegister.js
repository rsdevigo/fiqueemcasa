import React from "react";
import { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../components/logo";
import { useHistory } from "react-router-dom";
import firebase from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useUserProfile from "../hooks/useUserProfile";

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
  },
  select: {
    color: "#333333"
  }
}));

const user_categories = [
  {
    value: "helper",
    label: "Posso ajudar"
  },
  {
    value: "need",
    label: "Preciso de ajuda"
  }
];

export default function CompleteRegister(props) {
  const classes = useStyles();
  const history = useHistory();
  //const [user, initialising, error] = useAuthState(firebase.auth());
  const [userProfileError, initialising, userProfile, user] = useUserProfile();

  const [state, setState] = useState({
    name: "",
    phone: "",
    quarter: "",
    user_category: props.match.params.category
      ? props.match.params.category
      : ""
  });
  const handleChangeInput = prop => event => {
    setState({ ...state, [prop]: event.target.value });
  };
  if (initialising) {
    return (
      <div className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Logo />
          <Typography variant="h6">Buscando sessão salva.</Typography>
        </Grid>
      </div>
    );
  }

  if (user && userProfile == null) {
    return (
      <div className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Logo />
          <Grid item xs={12} className={classes.formContainer}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
                label="Nome"
                variant="filled"
                fullWidth={true}
                color="secondary"
                className={classes.inputs}
                onChange={handleChangeInput("name")}
              />
              <TextField
                id="outlined-basic"
                label="Telefone"
                variant="filled"
                fullWidth={true}
                color="secondary"
                className={classes.inputs}
                onChange={handleChangeInput("phone")}
              />
              <TextField
                id="outlined-basic"
                label="Bairro onde mora"
                variant="filled"
                fullWidth={true}
                color="secondary"
                className={classes.inputs}
                onChange={handleChangeInput("quarter")}
              />
              <TextField
                label="Cadastrar como:"
                variant="filled"
                fullWidth={true}
                color="secondary"
                className={classes.inputs}
                onChange={handleChangeInput("user_category")}
                value={state.user_category}
                select
              >
                {user_categories.map(option => {
                  return (
                    <MenuItem
                      className={classes.select}
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  );
                })}
              </TextField>
              <Button
                variant="contained"
                size="medium"
                fullWidth={true}
                color="secondary"
                className={classes.actionButtons}
              >
                Finalizar Cadastro
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

  if (user && userProfile != null && !userProfile.data().blocked) {
    return <div>{userProfile.data().email}</div>;
  }
}
