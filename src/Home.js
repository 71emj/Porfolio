import React, { Component } from "react";
import Nav from "./components/Nav";
import ScrollBar from "./components/ScrollBar";
import Canvas from "./components/Canvas";
import Welcome from "./components/Welcome";
import About from "./components/About";
import "./App.css";

// the idea is, first ver of the portfolio will only contain in main page
// portfolio link will lead to portfolio part of the page, which will only have a message
// and links to repos
// later will add more pages to the collections

// transition won't kick in in mobile view....because the event is triggered by mousewheel
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: "",
      invertStyle: false,
      scrolling: false
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
    console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
    console.log({ valY, docH, winH });

    const params = new Array();
    switch (true) {
      case ratio <= 0.2:
        params.push("home", 0, 0);
        break;
      case ratio <= 0.4:
        params.push("about", winH, 15);
        break;
      case ratio <= 0.6:
        params.push("contact", winH * 2, 30, true);
        break;
      default:
        console.log(params);
    }

    this.adjustBackground();
    this.scroll(...params);
    window.addEventListener("resize", this.adjustBackground);
    window.addEventListener("wheel", this.scrollHandler);
  }

  linkHandler = evt => {
    const { name } = evt.target.dataset;
    const { winH } = this.DOMS;

    const params = new Array();
    switch (name) {
      case "home":
        params.push("home", 0, 0);
        break;
      case "about":
        params.push("about", winH, 15);
        break;
      case "contact":
        params.push("contact", winH * 2, 30, true);
        break;
      default:
        console.log("nothing");
    }
    this.scroll(...params);
  }

  scrollHandler = evt => {
    const { visible, scrolling } = this.state;
    const { winH, valY } = this.DOMS;
    const flagY = evt.deltaY;
    
    const params = new Array();
    switch (true) {
      case valY < 508 && flagY <= -10 && visible === "about":
        params.push("home", 0, 0);
        this.scroll(...params);
        break;
      case visible === "contact" && flagY <= -10:
      case valY > 250 && visible === "home" && flagY >= 10:
        params.push("about", winH, 15);
        this.scroll(...params);
        break;
      case valY > 1008 && visible === "about" && flagY >= 10:
        params.push("contact", winH * 2, 30, true);
        this.scroll(...params);
        break;
      default:
        if (scrolling) {
          evt.preventDefault();
          console.log("stop scrolling");
        }
    }
  }

  scroll = (name, scrollY, backgroundY, setInvert = false) => {
    // console.log({name, scrollY, backgroundY});
    Promise.resolve(this.setState({ scrolling: true, invertStyle: setInvert })).then(() => {
      this.gradientScroll(null, backgroundY);
      setTimeout(() => {
        window.scrollTo(0, scrollY);
        this.setState((state, props) => {
          // console.log(scrollY);
          return { visible: name, scrolling: false };
        });
      }, 300);
    });
  }
  
  gradientScroll = (evt, backgroundY, className) => {
    const { body, valY, docH, nav } = this.DOMS;
    // [backgroundY, className] = !isNaN(+backgroundY) ? [backgroundY, className] : ["", backgroundY]; 
    // nav.classList = ` ${className}`;
    body.style.backgroundPosition = `50% ${backgroundY}%`;
  }

  adjustBackground = evt => {
    const { body, docH, winH } = this.DOMS;
    body.style.backgroundSize = `${window.innerWidth}px ${docH * 2.5}px`;
  }
  
  render() {
    const { visible, invertStyle } = this.state;
    const scrollbarLocation = new Map([["home", 0], ["about", 15], ["contact", 30]]);
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
            <Welcome show={visible === "contact"} type="fade up" />
          </div>
        </main>
      </div>
    );
  }
}

export default Home;
