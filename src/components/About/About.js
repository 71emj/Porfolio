import React, { Component } from "react";
import { Segment, Header } from "semantic-ui-react";
import Banner from "../Banner";
import "./style.css";

class About extends Component {
	content() {
		const style = {
			background: "none",
			boxShadow: "none",
			border: "none",
			textShadow: "#b0b0b0 0 0 1px"
		};

		return (
			<Segment key="aboutMe" as="div" size="huge" style={style}>
				<Header as="h1" textAlign={"left"}>
					Hello, I'm 71emj
					<Header.Subheader>
						full-stack developer and react lover
					</Header.Subheader>
				</Header>
				<br />
				<p>
					I am a full-stack developer living in Charlotte, with love for both UX
					design and server-side logic. I am also passionate about building
					computers, making coffee, and learning new technologies. 
				</p>
				<p>
					If you would like to talk about web, technology, or how to build your
					first computer feel free to connect via&nbsp;
					<a href="mailto:someone@example.com?Subject=Hello%20again" target="_top">Email</a>
					&nbsp;or&nbsp;
					<a href="https://linkedin.com/in/timothyjeng"	target="_blank">LinkedIn.</a>
				</p>
				<br />
			</Segment>
		);
	}

	render() {
		return (
			<Banner
				bannerkey="about"
				show={this.props.show}
				transition={true}
				animateType={this.props.type}
				duration={{ show: 500, hide: 0 }}
				hover={this.hover}
				children={this.content()}
			/>
		);
	}
}

export default About;