import { useStyles } from "./styles";
const Head = (props) => {
  const { pageName } = props;
  const classes = useStyles();
  return (
    <div className={classes.headRoot}>
      <div className={classes.headInner}>
        <h2>MINETOPIA</h2>
        <div className={classes.dot}></div>
        <h2>{pageName}</h2>
      </div>
    </div>
  );
};

export default Head;
