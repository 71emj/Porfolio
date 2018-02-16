import React, { Component } from "react";
import { Transition, Divider } from "semantic-ui-react";
import Nav from "./components/Nav";
import Canvas from "./components/Canvas";
import Banner from "./components/Banner";
import "./App.css";


// the idea is, first ver of the portfolio will only contain in main page
// portfolio link will lead to portfolio part of the page, which will only have a message
// and links to repos
// later will add more pages to the collections
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
      visible: "home"
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

  gradientScroll = evt => {
    const { body } = this.doms;
    const valY = window.scrollY;
    const height = this.docHeight;
    body.style.backgroundPosition = `50% ${0 + valY / height * 100}%`;
  };

  scrollToPlace = evt => {
    const valY = window.scrollY;
    const flagY = evt.deltaY;
    const height = this.docHeight;

    // set proper condition first, then fix the bug
    if (valY / height >= 0.30 && flagY >= 15) {
      // window.scrollTo(0, valY);
      this.setState((state, props) => {
        console.log(valY);
        setTimeout(() => { window.scrollTo(0, valY) }, 100);
        return { visible: "about" }
      });
    }
  };

  adjustBackground = evt => {
    const { body } = this.doms;
    const height = this.docHeight;
    body.style.backgroundSize = `${window.innerWidth}px ${height}px`;
  };

  componentDidMount() {
    this.adjustBackground();
    this.gradientScroll();
    window.addEventListener("resize", this.adjustBackground);
    window.addEventListener("mousewheel", evt => {
      this.gradientScroll(evt);
      this.scrollToPlace(evt);
    });
  }

  render() {
    const { visible } = this.state;
    const links = {
      about: "About",
      contact: "Contact",
      portfolio: "Portfolio",
      source: "Github"
    };

    return (
      <div>
        <Nav
          logo="Timothy Jeng"
          link={{ ...links }}
          scrollTo={this.gradientScroll}
          key="header"
        />
        <main key="content">
          <Canvas />
          <div className="--header" id="home">
            <Banner src="/assets/img/log.mp4" show={visible === "home"} />
          </div>
          <div className="--header" id="about">
            <Banner src="/assets/img/log.mp4" show={visible === "about"} />
          </div>
          <div className="--header" id="contact">
            <Banner src="/assets/img/log.mp4" show={visible === "contact"} />
          </div>
        </main>
      </div>
    );
  }
}

export default Home;

// if the #name is not visible
