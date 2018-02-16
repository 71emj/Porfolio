import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Canvas from "./components/Canvas";
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
        <Nav logo="Timothy Jeng" link={{ ...links }} key="header" />
        <main key="content">
          <Canvas />
          <div className="--header">
            <Banner src="/assets/img/log.mp4" />
          </div>
          <div className="--header" id="about">
            <Banner src="/assets/img/log.mp4" />
          </div>
          <div className="--header" id="contact">
            <Banner src="/assets/img/log.mp4" />
          </div>
        </main>
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
// <Switch>
//             <Route exact path="/">
//               <div className="--header">
//                 <Banner src="/assets/img/log.mp4" />
//               </div>
//             </Route>
//             <Route exact path="/about">
//               <div className="--header">
//                 <Banner src="/assets/img/log.mp4" />
//               </div>
//             </Route>
//           </Switch>
