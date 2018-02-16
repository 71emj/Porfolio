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
    const { visible } = this.state;
    const valY = window.scrollY;
    const flagY = evt.deltaY;
    const height = this.docHeight;
    const scroll = (name, valY, self) => {
      window.scrollTo(0, valY);
      setTimeout(() => {
        self.setState((state, props) => {
          console.log(valY);
          return { visible: name };
        });
      }, 300);
    };

    switch (true) {
      case valY === 0 && flagY <= -15:
        scroll("home", valY, this);
        break;
      case valY >= 300 && visible !== "about" && flagY >= 15:
        evt.preventDefault();
        setTimeout(() => { scroll("about", 745, this); }, 100);
        break;
      case valY >= 700 && visible !== "contact":
        evt.preventDefault();
        setTimeout(() => { scroll("contact", 1500, this); }, 100);
        break;
      
      // two scroll event should have the same input to sync for consistent effect
      // 
      // case valY / height > .5 && flagY >= 15:
      //   scroll("contact", valY, this);
      //   break;
      default:
        console.log("something's up...");
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
