import React, { Component } from "react";
import Nav from "./components/Nav";
import ScrollBar from "./components/ScrollBar";
import Canvas from "./components/Canvas";
import Welcome from "./components/Welcome";
import About from "./components/About";
import Contact from "./components/Contact";
import Scroll from "./util/Scroll";
import "./App.css";

// the idea is, first ver of the portfolio will only contain in main page
// portfolio link will lead to portfolio part of the page, which will only have a message
// and links to repos
// later will add more pages to the collections
const scroller = new Scroll();


// transition won't kick in in mobile view....because the event is triggered by mousewheel
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: "",
      invertStyle: false
    };
  }
  
  get DOMS() {
    const winH = window.innerHeight;
    const valY = window.scrollY;
    return { ...this.DOMrefs, docH: this.docHeight, winH, valY };
  }
  
  get DOMrefs() {
    const body = document.body;
    const html = document.documentElement;
    const nav = document.querySelector("nav");
    return { body, html, nav };
  }

  get docHeight() {
    const { body, html } = this.DOMrefs;
    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  }

  componentDidMount() {
    const { valY, docH, winH } = this.DOMS;
    const ratio = valY / docH;

    let name = ""
    switch (true) {
      case ratio <= 0.25:
        name = "home";
        break;
      case ratio <= 0.45:
        name = "about";
        break;
      case ratio <= 0.7:
        name = "contact";
        break;
      default:
        console.log("wrong");
    }

    scroller.scrollToPlace({ name }, this.scrollAndUpdateState);
    this.adjustBackground();
    window.addEventListener("scroll", this.scrollHandler);
    window.addEventListener("resize", this.adjustBackground);
  }
  
  scrollAndUpdateState = name => {
    const updateFields = { visible: name };
    let backgroundScrollY = 0;

    switch (name) {
      case "home":
      case "about":
        backgroundScrollY = name === "home" ? 0 : 15;
        updateFields.invertStyle = false;
        break;
      case "portfolio":
      case "contact":
        backgroundScrollY = name === "portfolio" ? 30 : 45;
        updateFields.invertStyle = true;
        break;
      default:
        console.log("something wrong");
    }

    this.gradientScroll(backgroundScrollY);
    this.setState(updateFields);
  }
  
  linkHandler = evt => {
    const { name } = evt.target.dataset;
    const { winH } = this.DOMS;
    scroller.scrollToPlace({ name }, this.scrollAndUpdateState);
  }

  scrollHandler = evt => {
    const { visible } = this.state;
    scroller.scroll({ evt, visible }, this.scrollAndUpdateState);
  }

  gradientScroll = backgroundScrollY => {
    const { body } = this.DOMS;
    body.style.backgroundPosition = `50% ${backgroundScrollY}%`;
  }

  adjustBackground = evt => {
    const { body, docH, winH } = this.DOMS;
    body.style.backgroundSize = `${window.innerWidth}px ${docH * 2.5}px`;
  }
  
  render() {
    const { visible, invertStyle } = this.state;
    const scrollbarLocation = new Map([["home", 0], ["about", 25], ["contact", 50]]);
    return (
      <div>
        <ScrollBar domElements={this.DOMS} position={scrollbarLocation.get(visible)} fadeTime={1000}/>
        <Nav logo="71emj" linkTo={this.linkHandler} key="header" invert={invertStyle} />
        <main key="content">
          <Canvas />
          <div className={`--content --small ${visible === "home" ? "" : "--hidden"}`} id="home">
            <Welcome show={visible === "home"} type="fade up" />
          </div>
          <div className={`--content --medium ${visible === "about" ? "" : "--hidden"}`} id="about">
            <About show={visible === "about"} type="fade up" />
          </div>
          <div className={`--content --small ${visible === "contact" ? "" : "--hidden"}`} id="contact">
            <Contact show={visible === "contact"} type="fade up" />
          </div>
        </main>
      </div>
    );
  }
}

/// move wrappers to individual page, make it into a Body component...modularize it by passing content as children
/// ...might need ternary to detect children's presence or it might work simply calling this.props.children

export default Home;
