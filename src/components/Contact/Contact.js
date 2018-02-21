import React, { Component } from "react";
import { Segment, Header, Icon } from "semantic-ui-react";
import Banner from "../Banner";
import "./style.css";

class Contact extends Component {
	content() {
		const style = {
			background: "none",
			boxShadow: "none",
			border: "none",
			color: "white",
			textShadow: "#b0b0b0 0 0 1px"
		};

		return(
			<Segment key="aboutMe" as="div" size="huge" style={style}>
				<p>Hello World, this is my contact</p>
				<br/>
			</Segment>
		)
	}

	render() {
		return(
			<Banner
				bannerkey="contact"
				show={this.props.show}
				transition={true}
				animateType={this.props.type}
				duration={{ show: 750, hide: 0 }}
				children={this.content()}
			/>
		)
	}
}

export default Contact;