import { useState } from "react";
import { useStyles } from "./styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const SideBarMobile = (props) => {
  const { heads, setSelected } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const textOverflow = (text) => {
    if (text && text.length > 35) {
      text = text.slice(0, 35) + "...";
    }
    return <>{text}</>;
  };
  const handleClick = (index) => {
    setSelected(index);
    setOpen(false);
    window.scroll({ left: 0, top: 0, behavior: "smooth" });
  };
  return (
    <div className={classes.barRoot}>
      <div className={classes.barMobBtn} onClick={() => setOpen(!open)}>
        <h4 className={classes.headColor}>Articles in this section</h4>
        <ExpandMoreIcon
          className={open ? classes.rotate : classes.notRotate}
          style={{ color: "white" }}
        />
      </div>
      {open
        ? heads.map((item, index) => {
            return (
              <button
                onClick={() => handleClick(index)}
                className={classes.headColor}
              >
                {textOverflow(item.heading)}
              </button>
            );
          })
        : null}
    </div>
  );
};

export default SideBarMobile;
