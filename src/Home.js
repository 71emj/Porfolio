import React, { Component } from "react";
import { Grid, Column, Sticky } from "semantic-ui-react";
import Nav from "./components/Nav";
import Canvas from "./components/Canvas";
import Banner from "./components/Banner";
import Section from "./components/Section";
import content from "./paragraph.json";
import "./App.css";

class App extends Component {
  render() {
    const links = {
      about: "About",
      contact: "Contact",
      portfolio: "Portfolio",
      source: "Github"
    };
    console.log(content["About"]);

    return [
      <Nav logo="Timothy Jeng" link={{ ...links }} key="header" />,
      <main key="content">
        <Canvas />
        <header>
          <Banner src="/assets/img/log.mp4"/>
        </header>
      </main>
    ];
  }
}

export default App;

// <Grid as="main" doubling={true} key="main">
//         <Grid.Row verticalAlign="middle" as="section">
//           <Grid.Column width={16}>
//             <Banner key="banner" src="/assets/img/log.mp4" placeholder="nothing atm" />
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
