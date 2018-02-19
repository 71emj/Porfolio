import React, { Component } from "react";
import { Segment, Header } from "semantic-ui-react";
import Banner from "../Banner";
import "./style.css";

class About extends Component {
	render() {
		const duration = {
			show: 750,
			hide: 0
		};
		const style = {
			background: "none",
			boxShadow: "none",
			border: "none",
			textShadow: "#b0b0b0 0 0 1px"
		};

		return (
			<Banner
				bannerkey="about"
				show={this.props.show}
				transition={true}
				animateType={this.props.type}
				duration={duration}
				children={
					<Segment key="segment" as="div" size="huge" style={style}>
						<Header as="h1" textAlign={"left"}>
							Hi,
							<Header.Subheader>
								My name is Timothy Jeng, and I am a developer, designer, and a
								stage 5 coffee drinker.
							</Header.Subheader>
						</Header>
						<br />
						<p>
							I am a fully trained web developer, with knowledge in both
							front and backend technologies. On the backend, I am skilled in
							designing RESTful API with Node, Express, and MongoDB, user
							authentication with Passport, JWT and server session; on the
							frontend, I am proficient with javascript libraries such as
							jQuery, React, and WebGL as well as CSS frameworks such as
							Bootstrap and Semantic UI as well
						</p>
					</Segment>
				}
			/>
		);
	}
}

export default About;
