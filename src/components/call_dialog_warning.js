import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    flexGrow: 1,
    minWidth: 275,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  title: {
    fontSize: 40,
    color: theme.palette.warning.main,
    textAlign: "center"
  },
  pos: {
    marginBottom: 12
  }
}));

export default function CallDialogWarning(props) {
  const classes = useStyles();
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={classes.title} id="alert-dialog-title">
        <WarningIcon style={{ fontSize: 40 }} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{ textAlign: "justify" }}
          id="alert-dialog-description"
        >
          Lembre-se nesse momento precisamos que você fique bem, ou seja, só
          realize um chamado em caso de extrema necessidade.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={props.onAccept} color="primary" autoFocus>
          Realizar pedido
        </Button>
      </DialogActions>
    </Dialog>
  );
}
