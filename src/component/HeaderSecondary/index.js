import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import logo from "../../assests/logo.png";

const HeaderSecondary = () => {
  const classes = useStyles();
  return (
    <Box className={classes.logoContainer}>
      <Box className={classes.logoImage}>
        <img src={logo} alt="minetopia logo" />
      </Box>
    </Box>
  );
};

export default HeaderSecondary;

const useStyles = makeStyles((theme) => ({
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1em",
  },

  img: {
    maxWidth: "100%",
    height: "100%",
  },
}));
