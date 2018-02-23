import React, { Component } from "react";
import Nav from "./components/Nav";
import ScrollBar from "./components/ScrollBar";
import Canvas from "./components/Canvas";
import Welcome from "./components/Welcome";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import DOMScroll from "./util/Scroll";
import Switch from "./util/Switch";
import "./App.css";

// the idea is, first ver of the portfolio will only contain in main page
// portfolio link will lead to portfolio part of the page, which will only have a message
// and links to repos
// later will add more pages to the collections
const Scroll = new DOMScroll();
const switchCase = new Switch();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: "",
      invertStyle: false
    };
  }
  
  get DOMS() {
    const valY = window.scrollY;
    return { ...this.DOMrefs, docH: this.docHeight, valY };
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
    const { valY, docH } = this.DOMS;
    const ratio = valY / docH;

    let name = "";
    switchCase
      .evalTargets({ ratio })
      .evaluate([`ratio <= .25`], end => {
        name = "home"
        end();
      })
      .evaluate([`ratio <= .45`], end => {
        name = "about"
        end();
      })
      .evaluate([`ratio <= 1`], end => {
        name = "contact"
        end();
      })
      .default(debug => debug());


    Scroll.scrollToPlace({ name }, this.scrollAndUpdateState);
    this.adjustBackground();
    window.addEventListener("scroll", this.scrollHandler);
    window.addEventListener("resize", this.adjustBackground);
  }
  
  scrollAndUpdateState = name => {
    const updateFields = { visible: name };
    let backgroundScrollY = 0;

    const bkgdIsNormal = name === "home" || name === "about" ? true : false;
    
    if (bkgdIsNormal) {
      backgroundScrollY = name === "home" ? 5 : 20;
      updateFields.invertStyle = false;
    } 
    else if (!bkgdIsNormal) {
      backgroundScrollY = name === "portfolio" ? 55 : 85;
      updateFields.invertStyle = true;
    }

    this.gradientScroll(backgroundScrollY);
    this.setState(updateFields);
  }
  
  linkHandler = evt => {
    const { name } = evt.target.dataset;
    Scroll.scrollToPlace({ name }, this.scrollAndUpdateState);
  }

  scrollHandler = evt => {
    const { visible } = this.state;
    Scroll.scroll({ evt, visible }, this.scrollAndUpdateState);
  }

  gradientScroll = backgroundScrollY => {
    const { body } = this.DOMS;
    body.style.backgroundPosition = `50% ${backgroundScrollY}%`;
  }

  adjustBackground = evt => {
    const { body, docH } = this.DOMS;
    body.style.backgroundSize = `${window.innerWidth}px ${docH}px`;
  }
  
  render() {
    const { visible, invertStyle } = this.state;
    const scrollbarLocation = new Map([["home", 0], ["about", 25], ["contact", 100]]);
    return (
      <div>
        <ScrollBar domElements={this.DOMS} position={scrollbarLocation.get(visible)} fadeTime={1000}/>
        <Nav logo="71emj" linkTo={this.linkHandler} key="header" invert={invertStyle} />
        <main key="content">
          <Canvas />
          <Welcome show={visible === "home"} type="fade up" />
          <About show={visible === "about"} type="fade up" />
          <Skills show={visible === "skill"} type="fade up" />
          <Contact show={visible === "contact"} type="fade up" />
        </main>
      </div>
    );
  }
}

/// move wrappers to individual page, make it into a Body component...modularize it by passing content as children
/// ...might need ternary to detect children's presence or it might work simply calling this.props.children

export default Home;
