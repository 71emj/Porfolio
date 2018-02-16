import React, { Component } from "react";
import Embed from "../Embed";
import { Container, Transition } from "semantic-ui-react";
import "./style.css";

class Banner extends Component {

	render() {
		return (
			<Container as="div" key="banner" className="--flex --wrapper">
				<Transition animation="scale" duration={500} visible={this.props.show} className="">
					<div>
						<img src="./assets/img/SVG/screen.svg" className="--monitor" />
						<img src="./assets/img/SVG/line1.svg" className="--lines" />
						<img src="./assets/img/SVG/line2.svg" className="--lines" />
					</div>
				</Transition>
			</Container>
		);
	}
}

export default Banner;
