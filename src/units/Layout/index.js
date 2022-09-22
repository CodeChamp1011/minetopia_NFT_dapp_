import React from "react";
import { makeStyles } from "@material-ui/core";

const Layout = ({ children }) => {
  const clasess = useStyles();
  return (
    <>
      <div className={clasess.main}>{children}</div>
    </>
  );
};

export default Layout;

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "black !important",
    minHeight: "100vh",
  },
}));
