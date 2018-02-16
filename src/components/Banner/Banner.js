import React, { Component } from "react";
import Embed from "../Embed";
import { Container } from "semantic-ui-react";
import "./style.css";

// these functions should be controlled by parents
const gradientScroll = evt => {
	const valY = window.scrollY;
	const body = document.body;
	const html = document.documentElement;
	const height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
	console.log({ valY, height});
	body.style.backgroundPosition = `50% ${0 + (valY / height) * 100}%`; 
	return height;
}

const adjustBackground = evt => {
	const height = gradientScroll();
	document.body.style.backgroundSize = `${window.innerWidth}px ${height}px`;
}

class Banner extends Component {
	componentDidMount() {
		adjustBackground();
		window.onresize = adjustBackground;
		window.onmousewheel = gradientScroll;
	}

	render() {
		return (
			<Container as="div" key="banner" className="--flex --wrapper">
				<img src="./assets/img/SVG/screen.svg" className="--monitor" />
				<img src="./assets/img/SVG/line1.svg" className="--lines" />
				<img src="./assets/img/SVG/line2.svg" className="--lines" />
			</Container>
		);
	}
}

export default Banner;
