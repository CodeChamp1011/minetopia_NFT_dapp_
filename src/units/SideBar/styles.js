import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  barRoot: {
    fontFamily: "lato, sans-serif",
    "& button": {
      fontFamily: "lato, sans-serif",
      background: "transparent",
      fontSize: "18px",
      width: "100%",
      color: "#353840",
      fontWeight: "700",
      padding: "10px",
      border: "none",
      textAlign: "left",
      borderRadius: "4px",
      lineHeight: "1.7",
      cursor: "pointer",
      transition: ".5s",
      paddingLeft: 0,
      "&:hover": {
        background: "#FBFDFF",
        border: "none",
        transition: ".5s",
        color: "black",
      },

      "&:focus": {
        color: "#46B104",
        border: "none",
        transition: ".5s",
      },
    },
  },
  bigScreen: {
    display: "block",

    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  mobScreen: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  headColor: {
    color: "white",
  },
}));
