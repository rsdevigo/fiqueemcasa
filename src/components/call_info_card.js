import React from "react";
import { useState, useEffect } from "react";
import WarningIcon from "@material-ui/icons/Warning";
import HelpIcon from "@material-ui/icons/Help";
import firebase from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Modal,
  useRadioGroup
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    minWidth: 250,
    outline: 0,
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  modal: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

export default function CallInfoCard(props) {
  const classes = useStyles();
  var callId = props.call ? props.call.id : "0";
  const [needuser, setNeedUser] = useState(null);

  useEffect(() => {
    console.log(callId);
    const unsubscribe = () => {
      firebase
        .firestore()
        .doc("users_profiles/" + callId)
        .onSnapshot(docSnapshot => {
          setNeedUser(docSnapshot);
        });
    };
    return unsubscribe();
  }, [callId]);

  const acceptCall = () => {
    props.call.ref
      .set(
        {
          helper_uid: firebase
            .firestore()
            .doc("/users_profiles/" + props.user.uid),
          status: "doing"
        },
        { merge: true }
      )
      .then(props.onAccept());
  };

  var create_date = props.call
    ? new Date(props.call.get("create_date").seconds * 1000)
    : null;
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={props.handleClose}
    >
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Pedido de ajuda de:
          </Typography>
          <Typography variant="h5" component="h2">
            {needuser && needuser.get("name")}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Feito em: {create_date && create_date.getDate()}/
            {create_date && create_date.getMonth() + 1}/
            {create_date && create_date.getFullYear()}
          </Typography>
          <Typography variant="body1" component="p">
            Idade: {needuser && needuser.get("age")} anos
          </Typography>
          <Typography variant="body1" component="p">
            Bairro onde mora: {needuser && needuser.get("quarter")}
          </Typography>
          <Typography variant="body1" style={{ marginTop: 10 }} component="p">
            <WarningIcon style={{ color: "#ff9800", fontSize: 40 }} />
          </Typography>
          <Typography paragraph variant="body1" component="p">
            <strong>Atenção</strong>: Usuário em grupo de risco, apenas ajude em
            caso de extrema necessidade.
          </Typography>
          <Typography paragraph variant="body1" component="p">
            <strong>Não ofereça carona para evitar contato.</strong>
          </Typography>
          <Button
            color="default"
            className={classes.button}
            startIcon={<HelpIcon />}
            size="small"
            variant="outlined"
            component="a"
            href="https://www.saude.gov.br/images/pdf/2020/marco/24/Coronavirus--Isolamento-Domiciliar.pdf"
          >
            Saiba como lidar com o grupo de risco
          </Button>
        </CardContent>
        <CardActions>
          <Button size="small" color="secondary" onClick={props.handleClose}>
            Fechar
          </Button>
          <Button
            size="small"
            style={{ marginLeft: "auto" }}
            variant="contained"
            color="primary"
            onClick={acceptCall}
          >
            Quero Ajudar
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}
