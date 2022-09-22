import { useStyles } from "./styles";
import MobileView from "./MobileView";

const SideBar = (props) => {
  const { heads, setSelected } = props;
  const classes = useStyles();
  const textOverflow = (text) => {
    if (text && text.length > 35) {
      text = text.slice(0, 35) + "...";
    }
    return <>{text}</>;
  };
  return (
    <div className={classes.barRoot}>
      <div className={classes.bigScreen}>
        <h4 className={classes.headColor}>Articles in this section</h4>
        {heads.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => setSelected(index)}
              className={classes.btnSidebar}
            >
              {textOverflow(item.heading)}
            </button>
          );
        })}
      </div>
      <div className={classes.mobScreen}>
        <MobileView heads={heads} setSelected={setSelected} />
      </div>
    </div>
  );
};

export default SideBar;
