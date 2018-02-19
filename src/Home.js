import React, { Component } from "react";
import Nav from "./components/Nav";
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
    return { body, html };
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

    const params = new Array();
    switch (true) {
      case ratio <= 0.3:
        params.push("home", 0, 0);
        break;
      case ratio <= 0.6:
        params.push("about", winH, 15);
        break;
      case ratio <= 0.9:
        params.push("contact", winH * 2, 45);
        break;
      default:
        console.log(params);
    }

    this.adjustBackground();
    this.scroll(...params);
    window.addEventListener("resize", this.adjustBackground);
    window.addEventListener("mousewheel", this.scrollHandler);
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
        params.push("contact", winH * 2, 45);
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
        setTimeout(() => { this.scroll(...params); }, 250);
        break;
      case visible === "contact" && flagY <= -10:
      case valY > 250 && visible === "home" && flagY >= 10:
        params.push("about", winH, 15);
        setTimeout(() => { this.scroll(...params); }, 250);
        break;
      case valY > 1008 && visible === "about" && flagY >= 10:
        params.push("contact", winH * 2, 45);
        setTimeout(() => { this.scroll(...params); }, 250);
        break;
      default:
        if (scrolling) {
          evt.preventDefault();
          console.log("stop scrolling");
        }
    }
  }

  scroll = (name, valY, posY) => {
    console.log({name, valY, posY});
    Promise.resolve(this.setState({ scrolling: true })).then(() => {
      window.scrollTo(0, valY);
      this.gradientScroll(null, posY);
      setTimeout(() => {
        this.setState((state, props) => {
          console.log(valY);
          return { visible: name, scrolling: false };
        });
      }, 300);
    });
  }

  gradientScroll = (evt, scrollY) => {
    const { body, valY, docH } = this.DOMS;
    if (scrollY) {
      return (body.style.backgroundPosition = `50% ${scrollY}%`);
    }
    body.style.backgroundPosition = `50% ${valY / docH * 100}%`;
  }

  adjustBackground = evt => {
    const { body, docH } = this.DOMS;
    body.style.backgroundSize = `${window.innerWidth}px ${docH * 2.5}px`;
  }
  
  render() {
    const { visible } = this.state;
    return (
      <div>
        <Nav logo="Timothy Jeng" linkTo={this.linkHandler} key="header" />
        <main key="content">
          <Canvas />
          <div className={`--content ${visible === "home" ? "" : "--hidden"}`} id="home">
            <Welcome show={visible === "home"} type="fade up" />
          </div>
          <div className={`--content ${visible === "about" ? "" : "--hidden"}`} id="about">
            <About show={visible === "about"} />
          </div>
          <div className={`--content ${visible === "contact" ? "" : "--hidden"}`} id="contact">
            <Welcome show={visible === "contact"} />
          </div>
        </main>
      </div>
    );
  }
}

export default Home;
