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
import { useHistory, Redirect } from "react-router-dom";
import useUserProfile from "../hooks/useUserProfile";
import quarters from "../utils/quarters";
import firebase from "../firebase";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
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

const formatPhoneNumber = number => {
  return number;
};

export default function CompleteRegister(props) {
  const classes = useStyles();
  const history = useHistory();
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      });
  };
  const [userProfileError, initialising, userProfile, user] = useUserProfile();
  const [state, setState] = useState({
    name: "",
    phone: "",
    quarter: "",
    age: 0,
    user_category: props.match.params.category
      ? props.match.params.category
      : ""
  });
  const [errorState, setErrorState] = useState({
    error_props: []
  });
  const handleChangeInput = prop => event => {
    if (prop === "phone") {
      setState({ ...state, [prop]: formatPhoneNumber(event.target.value) });
    } else {
      setState({ ...state, [prop]: event.target.value });
    }
  };

  const checkEmpty = prop => {
    console.log(prop);
    if (state[prop] == "") {
      return true;
    }
    return false;
  };

  const errorPropsFind = prop => {
    return (
      errorState.error_props.findIndex(item => {
        return item == prop;
      }) != -1
    );
  };

  const onSubmit = () => {
    var error_props = [];
    Object.keys(state).forEach(key => {
      if (checkEmpty(key)) {
        error_props.push(key);
      }
    });
    if (error_props.length > 0) {
      setErrorState({ error_props: error_props });
    } else {
      if (user) {
        firebase
          .firestore()
          .collection("users_profiles")
          .doc(user.uid)
          .set({
            ...state,
            blocked: true,
            createAt: firebase.firestore.Timestamp.now()
          })
          .then(() => {
            history.push("/blockedwarning");
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
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

  if (user && userProfile && !userProfile.exists) {
    return (
      <div className={classes.root}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Logo />
          <Grid item xs={12} className={classes.formContainer}>
            <Typography
              variant="h6"
              align="center"
              style={{ paddingBottom: "10px" }}
            >
              Complete o seu cadastro com algumas informações
            </Typography>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="name"
                required
                label="Nome"
                variant="filled"
                fullWidth={true}
                color="secondary"
                className={classes.inputs}
                onChange={handleChangeInput("name")}
                error={errorPropsFind("name")}
                value={state.name}
              />
              <TextField
                id="age"
                required
                label="Idade"
                type="number"
                variant="filled"
                fullWidth={true}
                color="secondary"
                className={classes.inputs}
                onChange={handleChangeInput("age")}
                error={errorPropsFind("age")}
                value={state.age}
              />
              <TextField
                id="phone"
                required
                label="Telefone"
                type="tel"
                variant="filled"
                fullWidth={true}
                color="secondary"
                className={classes.inputs}
                onChange={handleChangeInput("phone")}
                error={errorPropsFind("phone")}
                value={state.phone}
              />
              <TextField
                id="quarter"
                required
                label="Bairro onde mora:"
                variant="filled"
                fullWidth={true}
                color="secondary"
                className={classes.inputs}
                onChange={handleChangeInput("quarter")}
                error={errorPropsFind("quarter")}
                value={state.quarter}
                select
              >
                {quarters.map(option => {
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
              <TextField
                id="category"
                required
                label="Cadastrar como:"
                variant="filled"
                fullWidth={true}
                color="secondary"
                className={classes.inputs}
                onChange={handleChangeInput("user_category")}
                error={errorPropsFind("user_category")}
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
                onClick={onSubmit}
              >
                Finalizar Cadastro
              </Button>
              <Button
                variant="contained"
                size="medium"
                fullWidth={true}
                color="secondary"
                className={classes.actionButtons}
                onClick={logout}
              >
                Sair da conta
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }

  if (user && userProfile != null && userProfile.data().blocked) {
    return <Redirect to="/blockedwarning" />;
  }

  if (user && userProfile && !userProfile.data().blocked) {
    return (
      <Redirect
        to={
          userProfile.get("user_category") === "helper"
            ? "/helperdashboard"
            : "/needdashboard"
        }
      />
    );
  }

  return <Redirect to="/" />;
}
