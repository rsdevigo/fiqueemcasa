import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main
  },
  logoTypography: {
    color: theme.palette.primary.main,
    fontFamily: "Oswald, sans-serif",
    fontWeight: 700,
    fontSize: "4.4rem",
    marginBlockEnd: 0,
    marginBlockStart: 0,
    lineHeight: 1
  },
  logoTypographyCasa: {
    color: theme.palette.primary.main,
    fontFamily: "Oswald, sans-serif",
    fontWeight: 700,
    fontSize: "7.6rem",
    marginBlockEnd: 0,
    marginBlockStart: 0,
    lineHeight: 1
  },
  logoContainer: {
    paddingTop: "1.8rem"
  }
}));

export default function Logo() {
  const classes = useStyles();
  return (
    <Grid item className={classes.logoContainer} xs={12}>
      <Typography
        align="center"
        variant="h1"
        className={classes.logoTypography}
      >
        FIQUE EM
      </Typography>
      <Typography
        variant="h1"
        className={classes.logoTypographyCasa}
        component="h2"
        align="center"
        gutterBottom={true}
      >
        CASA
      </Typography>
      <Typography
        paragraph={true}
        align="center"
        color="primary"
        variant="body1"
        className={classes.desc}
      >
        Um aplicativo para ajudar o grupo de risco ficar em casa
      </Typography>
    </Grid>
  );
}
