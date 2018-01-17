import React, { Component } from "react";
import { Grid, Column, Sticky } from "semantic-ui-react";
import Nav from "./components/Nav";
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
      <Grid as="main" doubling={true} key="main">
        <Grid.Row verticalAlign="middle" as="section">
          <Grid.Column width={3} />
          <Grid.Column width={10}>
            <Banner key="banner" src="/assets/img/log.mp4" placeholder="nothing atm" />
          </Grid.Column>
          <Grid.Column width={3}>
            <p>Lorem</p>
          </Grid.Column>
        </Grid.Row>
        <Section colWidth={[3, 10, 3]} color="blue" text={content["About"]} as="li" />
        <Section colWidth={[3, 10, 3]} color="black" text={content["About"]} as="li" />
      </Grid>
    ];
  }
}

export default App;
