import React, { Component } from "react";
import { Sticky } from "semantic-ui-react";
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import "./App.css";

class App extends Component {
  render() {
    const links = {
      about: "About",
      contact: "Contact",
      source: "Github"
    };
    return [
      <Nav logo="Timothy Jeng" link={{ ...links }} key="header"/>,
      <main key="main">
        <Banner key="banner" src="/assets/img/log.mp4" placeholder="nothing atm" key="banner"/>
        {Array(12)
          .fill(null)
          .map(elem => {
            return <li>elem</li>;
          })}
      </main>
    ];
  }
}

export default App;
