import React, { Component } from "react";
import Nav from "./components/Nav";
import ScrollBar from "./components/ScrollBar";
import Canvas from "./components/Canvas";
import Welcome from "./components/Welcome";
import About from "./components/About";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";

import DOMScroll from "./util/Scroll";
import Switch from "./util/Switch";
import "./App.css";

// the idea is, first ver of the portfolio will only contain in main page
// portfolio link will lead to portfolio part of the page, which will only have a message
// and links to repos
// later will add more pages to the collections
const switchCase = new Switch();
const Scroll = new DOMScroll();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: "",
      invertStyle: false
    };
  }

  get scrollbarLocation() {
    return new Map([["home", 0], ["about", 25], ["skills", 50], ["portfolio", 75], ["contact", 100]]);
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
    const ratio = window.scrollY / docH;
    
    let name = "";
    switchCase
      .evalTargets({ ratio })
      .evaluate([`ratio <= .25`], endSwitch => {
        endSwitch("home");
      })
      .evaluate([`ratio <= .5`], endSwitch => {
        endSwitch("about");
      })
      .evaluate([`ratio <= .75`], endSwitch => {
        endSwitch("skills");
      })
      .evaluate([`ratio <= 1`], endSwitch => {
        endSwitch("contact");
      })
      .default((debug, results) => { 
        name = results;
        debug();
      });

    Scroll.scrollToPlace({ name }, this.scrollAndUpdateState);
    this.adjustBackground();
    window.addEventListener("scroll", this.scrollHandler);
    window.addEventListener("resize", this.adjustBackground);
  }
  
  scrollAndUpdateState = name => {
    const updateFields = { visible: name };
    let backgroundScrollY = 0;

    switchCase
      .evalTargets({ name })
      .evaluate(["name === 'home'"], endSwitch => {
        endSwitch([3, false]);
      })
      .evaluate(["name === 'about'"], endSwitch => {
        endSwitch([18, false]);
      })
      .evaluate(["name === 'skills'"], endSwitch => {
        endSwitch([42, true]);
      })
      .evaluate(["name === 'portfolio'"], endSwitch => {
        endSwitch([68, true]);
      })
      .evaluate(["name === 'contact'"], endSwitch => {
        endSwitch([85, true]);
      })
      .default((debug, results) => { 
        const [ scrollVal, bool ] = results;
        backgroundScrollY = scrollVal;
        updateFields.invertStyle = bool;
        debug();
      });

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
    const scrollbar = this.scrollbarLocation;
    return (
      <div>
        <ScrollBar domElements={this.DOMS} position={scrollbar.get(visible)} fadeTime={800}/>
        <Nav logo="71emj" linkTo={this.linkHandler} key="header" invert={invertStyle} />
        <main key="content">
          <Canvas />
          <Welcome show={visible === "home"} type="fade up" />
          <About show={visible === "about"} type="fade up" />
          <Skills show={visible === "skills"} type="fade up" />
          <Portfolio show={visible === "portfolio"} type="fade up" />
          <Contact show={visible === "contact"} type="fade up" />
        </main>
      </div>
    );
  }
}

/// move wrappers to individual page, make it into a Body component...modularize it by passing content as children
/// ...might need ternary to detect children's presence or it might work simply calling this.props.children

export default Home;
