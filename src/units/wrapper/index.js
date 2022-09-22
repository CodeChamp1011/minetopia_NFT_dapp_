import { makeStyles } from "@material-ui/core";

const Wrapper = ({ children }) => {
  const clasess = useStyles();
  return (
    <>
      <div className={clasess.main}>{children}</div>
    </>
  );
};

export default Wrapper;

const useStyles = makeStyles((theme) => ({
  main: {
    padding: "30px 130px 30px 130px ",

    [theme.breakpoints.down("sm")]: {
      padding: "0px",
    },
  },
}));
