import { Box, makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderSecondary from "../component/HeaderSecondary";
import Privacy from "../pages/Privacy";
import TermAndConditions from "../pages/TermsAndConditions";
import Layout from "../units/Layout";
import Wrapper from "../units/wrapper";
import Home from "../pages/Home";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/privacy"
          element={
            <Layout>
              <HeaderSecondary />
              <Wrapper>
                <Privacy />
              </Wrapper>
            </Layout>
          }
        />
      </Routes>
      <Routes>
        <Route
          exact
          path="/terms-and-conditions"
          element={
            <Layout>
              <HeaderSecondary />
              <Wrapper>
                <TermAndConditions />
              </Wrapper>
            </Layout>
          }
        />
      </Routes>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default Routers;
