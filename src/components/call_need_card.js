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

export default function CallNeedCard(props) {
  const classes = useStyle();
  const [user, userProfile] = useSession();
  const [helper, helperLoading, helperError] = useDocument(
    props.call.get("helper_uid")
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
          Seu pedido de ajuda foi atendido logo a pessoa voluntária irá ligar
          para você.
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          O nome da pessoa é:{" "}
          {!helperLoading && helper.exists && helper.get("name")}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Caso queira ligar o telefone é:</strong>{" "}
          {!helperLoading && helper.exists && helper.get("phone")}
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
          <strong>Atenção:</strong> Não peça carona.
        </Typography>
      </CardContent>
      <CardActions>
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
