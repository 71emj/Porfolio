import React, { Component } from "react";
import Nav from "./components/Nav";
import Canvas from "./components/Canvas";
import Banner from "./components/Banner";
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

  get doms() {
    const body = document.body;
    const html = document.documentElement;
    return { body, html };
  }

  get docHeight() {
    const { body, html } = this.doms;
    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  }

  componentDidMount() {
    const ratio = window.scrollY / this.docHeight;
    this.adjustBackground();
    window.addEventListener("resize", this.adjustBackground);
    window.addEventListener("mousewheel", this.scrollHandler);

    const params = new Array();
    switch (true) {
      case ratio <= 0.3:
        params.push("home", 0, 0);
        break;
      case ratio <= 0.6:
        params.push("about", window.innerHeight, 15)
        break;
      case ratio <= 0.9:
        params.push("contact", window.innerHeight * 2, 45)
        break;
      default:
        console.log(params);
    }
    this.scroll(...params);
  }

  linkHandler = evt => {
    const { name } = evt.target.dataset;
    const winH = window.innerHeight;
    switch (name) {
      case "home":
        this.scroll("home", 0, 0);
        break;
      case "about":
        this.scroll("about", winH, 15);
        break;
      case "contact":
        this.scroll("contact", winH * 2, 45);
        break;
      default:
        console.log("nothing");
    }
  }

  scrollHandler = evt => {
    const { visible, scrolling } = this.state;
    const winH = window.innerHeight;
    const valY = window.scrollY;
    const flagY = evt.deltaY;

    switch (true) {
      case valY < 508 && flagY <= -10 && visible === "about":
        setTimeout(() => { this.scroll("home", 0, 0); }, 250);
        break;
      case visible === "contact" && flagY <= -10:
      case valY > 250 && visible === "home" && flagY >= 10:
        setTimeout(() => { this.scroll("about", winH, 15); }, 250);
        break;
      case valY > 1008 && visible === "about" && flagY >= 10:
        setTimeout(() => { this.scroll("contact", winH * 2, 45); }, 250);
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
    const { body } = this.doms;
    const valY = window.scrollY;
    const height = this.docHeight;
    if (scrollY) {
      return (body.style.backgroundPosition = `50% ${scrollY}%`);
    }
    body.style.backgroundPosition = `50% ${valY / height * 100}%`;
  }

  adjustBackground = evt => {
    const { body } = this.doms;
    const height = this.docHeight;
    body.style.backgroundSize = `${window.innerWidth}px ${height * 2.5}px`;
  }
  
  render() {
    const { visible } = this.state;
    return (
      <div>
        <Nav logo="Timothy Jeng" linkTo={this.linkHandler} key="header" />
        <main key="content">
          <Canvas />
          <div className={`--content ${visible === "home" ? "" : "--hidden"}`} id="home">
            <Banner show={visible === "home"} />
          </div>
          <div className={`--content ${visible === "about" ? "" : "--hidden"}`} id="about">
            <Banner show={visible === "about"} />
          </div>
          <div className={`--content ${visible === "contact" ? "" : "--hidden"}`} id="contact">
            <Banner show={visible === "contact"} />
          </div>
        </main>
      </div>
    );
  }
}

export default Home;
