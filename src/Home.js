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
      return body.style.backgroundPosition = `50% ${scrollY}%`;
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
  }

  scrollHandler = evt => {
    const { visible } = this.state;
    const valY = window.scrollY;
    const height = this.docHeight;
    const flagY = evt.deltaY;
    // describing condition....
    // if scorllY < 200 and the mouse scrolls up scroll to 0 
    // if scrollY > 200 but < 750 
    switch (true) {
      case flagY <= -35 && visible === "about":
        evt.preventDefault();
        setTimeout(() => { this.scroll("home", 0, 0); }, 100);
        break;
      case valY > 200 && visible === "home" && flagY >= 35 || visible === "contact" && flagY <= -35:
        evt.preventDefault();
        setTimeout(() => { this.scroll("about", 745, 60); }, 100);
        break;
      case valY > 700 && visible === "about" && flagY >= 35:
        evt.preventDefault();
        setTimeout(() => { this.scroll("contact", 1500, 95); }, 100);
        break;
      default:
        console.log("nothing triggerd");
    }
  };

  adjustBackground = evt => {
    const { body } = this.doms;
    const height = this.docHeight;
    body.style.backgroundSize = `${window.innerWidth}px ${height * 1.25}px`;
  };

  componentDidMount() {
    const ratio =  window.scrollY / this.docHeight;
    this.adjustBackground();
    window.addEventListener("resize", this.adjustBackground);
    window.addEventListener("mousewheel", evt => {
      this.scrollHandler(evt);
    });

    let field, posY;
    switch (true) {
      case ratio <= .3:
        field = "home";
        posY = 0;
        break;
      case ratio <= .6:
        field = "about";
        posY = 60;
        break;
      case ratio <= .9:
        field = "contact";
        posY = 95
        break;
      default:
        console.log(field);
    }
    this.gradientScroll(null, posY);
    this.setState({ visible: field });
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
          scrollTo={this.scrollHandler}
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
