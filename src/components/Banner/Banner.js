import React, { Component } from "react";
import Embed from "../Embed";
import { Container } from "semantic-ui-react";
import "./style.css";

class Banner extends Component {
	render() {
		return (
			<Container as="div" key="banner" className="--flex --wrapper">
				<img src="./assets/img/SVG/screen.svg" className="--monitor"/>
			</Container>
		);
	}
}

export default Banner;