import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDocument } from "react-firebase-hooks/firestore";
import firebase from "../firebase";
import { useSession } from "../hooks/useSession";
import HelpIcon from "@material-ui/icons/Help";

const useStyle = makeStyles(theme => ({
  callCard: {
    // marginTop: 70,
    maxWidth: 350,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "100%",
    outline: 0
  }
}));

export default function CallAcceptedCard(props) {
  const classes = useStyle();
  const [user, userProfile] = useSession();
  const [caller, callerLoading, callerError] = useDocument(
    firebase.firestore().doc("/users_profiles/" + props.call.id)
  );

  const finishCall = () => {
    firebase
      .firestore()
      .collection("calls_complete")
      .add({
        call: props.call.data(),
        caller: firebase.firestore().doc("/users_profiles/" + props.call.id),
        helper: firebase
          .firestore()
          .doc("/users_profiles/" + props.call.get("helper_uid"))
      })
      .then(() => {
        props.call.ref.delete();
      });
  };

  var create_date = new Date(props.call.get("create_date").seconds * 1000);
  return (
    <Card className={classes.callCard}>
      <CardMedia
        className={classes.media}
        component="img"
        image={process.env.PUBLIC_URL + "/card_header_media.png"}
        title="Cabeçalho com a representação da roupa do Superman com coração"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Detalhes do pedido de ajuda
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Ligue para {!callerLoading && caller.exists && caller.get("name")} e
          combine a ação.
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Telefone:</strong>{" "}
          {!callerLoading && caller.exists && caller.get("phone")}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Pedido feito em:</strong>{" "}
          {create_date && create_date.getDate()}/
          {create_date && create_date.getMonth() + 1}/
          {create_date && create_date.getFullYear()}
        </Typography>
        <Typography
          variant="body2"
          style={{ marginBottom: 10 }}
          color="textSecondary"
          component="p"
        >
          <strong>Atenção:</strong> Não ofereça carona.
        </Typography>

        <Button
          color="secondary"
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
        <Button
          size="small"
          component="a"
          href={
            "https://www.google.com/maps/search/?api=1&query=" +
            props.call.get("lat") +
            "," +
            props.call.get("long")
          }
          color="primary"
        >
          Onde a pessoa está ?
        </Button>
        <Button
          variant="contained"
          onClick={finishCall}
          size="small"
          color="primary"
        >
          Finalizar pedido de ajuda
        </Button>
      </CardActions>
    </Card>
  );
}
