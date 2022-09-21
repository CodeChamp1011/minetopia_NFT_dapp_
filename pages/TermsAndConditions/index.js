import { Grid } from "@material-ui/core";
import { useState } from "react";
import GenerateSeoTags from "../../components/GenerateSeoTags";
import DisplayQuestion from "../../units/displayQuestion";
import Head from "../../units/Heading";
import SideBar from "../../units/SideBar";
import { faqContent } from "./constants";
import { useStyles } from "./styles";

const TermAndConditions = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState(0);
  return (
    <Grid container className={classes.faqRoot}>
      {/* <GenerateSeoTags
        title="Privacy Policy"
        description="Minetopia"
      /> */}
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Head pageName="Terms And Conditions" />
      </Grid>
      <Grid item lg={3} md={12} sm={12} xs={12}>
        <SideBar setSelected={setSelected} heads={faqContent} />
      </Grid>
      <Grid item lg={9} md={12} sm={12} xs={12} className={classes.faqDisplay}>
        <DisplayQuestion selected={selected} content={faqContent} />
      </Grid>
    </Grid>
  );
};

export default TermAndConditions;
