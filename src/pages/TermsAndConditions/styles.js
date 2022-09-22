import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  faqHead: {
    color: "#0A1A72",
    minHeight: "100vh",
  },
  faqRoot: {
    // padding: "0px 100px 150px 100px",

    fontFamily: "lato, sans-serif",
    [theme.breakpoints.down("md")]: {
      padding: "0px 50px 100px 50px",
    },
  },
  faqDisplay: {
    padding: "0px 50px",
    "& p": {
      fontSize: "17px",
      fontWeight: "600",
      color: "#FFFFFF",
    },
    "& span": {
      color: "#B5A16C",
      wordSpacing: "3px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0px ",
    },
  },
}));
