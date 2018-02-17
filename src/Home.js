import React, { Component } from "react";
import { Transition, Divider } from "semantic-ui-react";
import Nav from "./components/Nav";
import Canvas from "./components/Canvas";
import Banner from "./components/Banner";
import "./App.css";

const throttle = function(evt, scrollTimer, lastScrollFireTime, scrollEvt) {
  const minScrollTime = 2000;
  const now = new Date().getTime();

  function processScroll() {
    console.log(new Date().getTime().toString());
  }

  if (scrollTimer) {
    return;
  }

  if (now - lastScrollFireTime > 3 * minScrollTime) {
    processScroll(); // fire immediately on first scroll
    scrollEvt(evt);
    lastScrollFireTime = now;
  }
  scrollTimer = setTimeout(function() {
    scrollTimer = null;
    lastScrollFireTime = new Date().getTime();
  }, minScrollTime);
  return;
};

// the idea is, first ver of the portfolio will only contain in main page
// portfolio link will lead to portfolio part of the page, which will only have a message
// and links to repos
// later will add more pages to the collections

// transition won't kick in in mobile view....because the event is triggered by mousewheel
class Home extends Component {
  constructor(props) {
    super(props);
    const body = document.body;
    const html = document.documentElement;
    this.doms = {
      body: body,
      html: html
    };
    this.state = {
      visible: ""
    };
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

  gradientScroll = (evt, scrollY) => {
    const { body } = this.doms;
    const valY = window.scrollY;
    const height = this.docHeight;
    if (scrollY) {
      return (body.style.backgroundPosition = `50% ${scrollY}%`);
    }
    body.style.backgroundPosition = `50% ${valY / height * 100}%`;
  };

  scroll = (name, valY, posY) => {
    window.scrollTo(0, valY);
    this.gradientScroll(null, posY);
    setTimeout(() => {
      this.setState((state, props) => {
        console.log(valY);
        return { visible: name };
      });
    }, 300);
  };

  scrollHandler = evt => {
    const { visible } = this.state;
    const winH = window.innerHeight;
    const valY = window.scrollY;
    const height = this.docHeight;
    const flagY = evt.deltaY;
    // describing condition....
    // if scorllY < 200 and the mouse scrolls up scroll to 0
    // if scrollY > 200 but < 750
    switch (true) {
      case valY < 508 && flagY <= -10 && visible === "about":
        evt.preventDefault();
        setTimeout(() => {
          this.scroll("home", 0, 0);
        }, 100);
        break;
      case valY > 250 && visible === "home" && flagY >= 10 || visible === "contact" && flagY <= -10:
        evt.preventDefault();
        setTimeout(() => {
          this.scroll("about", winH, 55);
        }, 100);
        break;
      case valY > 1008 && visible === "about" && flagY >= 10:
        evt.preventDefault();
        setTimeout(() => {
          this.scroll("contact", winH * 2, 70);
        }, 100);
        break;
      default:
        console.log("nothing triggerd");
    }
  };

  adjustBackground = evt => {
    const { body } = this.doms;
    const height = this.docHeight;
    body.style.backgroundSize = `${window.innerWidth}px ${height * 2.5}px`;
  };

  componentDidMount() {
    const ratio = window.scrollY / this.docHeight;
    this.adjustBackground();
    window.addEventListener("resize", this.adjustBackground);
    window.addEventListener("mousewheel", evt => {
      let scrollTimer;
      let lastScrollFireTime = 0;
      // console.log("hhhhhhhhhhhhhhhherrrrrrrrrrrrr");
      throttle(evt, scrollTimer, lastScrollFireTime, this.scrollHandler);
      // this.scrollHandler(evt);
    });

    let field, posY;
    switch (true) {
      case ratio <= 0.3:
        field = "home";
        posY = 0;
        break;
      case ratio <= 0.6:
        field = "about";
        posY = 55;
        break;
      case ratio <= 0.9:
        field = "contact";
        posY = 70;
        break;
      default:
        console.log(field);
    }
    this.gradientScroll(null, posY);
    this.setState({ visible: field });
  }

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Nav logo="Timothy Jeng" scrollTo={this.scrollHandler} key="header" />
        <main key="content">
          <Canvas />
          <div
            className={`--content ${visible === "home" ? "" : "--hidden"}`}
            id="home"
          >
            <Banner show={visible === "home"} />
          </div>
          <div
            className={`--content ${visible === "about" ? "" : "--hidden"}`}
            id="about"
          >
            <Banner show={visible === "about"} />
          </div>
          <div
            className={`--content ${visible === "contact" ? "" : "--hidden"}`}
            id="contact"
          >
            <Banner show={visible === "contact"} />
          </div>
        </main>
      </div>
    );
  }
}

export default Home;
