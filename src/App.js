import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home.js";
import Banner from "./components/Banner";
import "./App.css";

const links = {
  about: "About",
  contact: "Contact",
  portfolio: "Portfolio",
  source: "Github"
};

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/71emj/portfolio">
            <div className="--header">
              <Banner src="/assets/img/log.mp4" />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

// <Grid as="main" doubling={true} key="main">
//         <Grid.Row verticalAlign="middle" as="section">
//           <Grid.Column width={16}>
//             <Banner key="banner" src="/assets/img/log.mp4" placeholder="nothing atm" />
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
