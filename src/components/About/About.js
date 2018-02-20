import React, { Component } from "react";
import { Segment, Header } from "semantic-ui-react";
import Banner from "../Banner";
import "./style.css";

class About extends Component {
	clickHandler = evt => {
		evt.preventDefault();
		console.log(evt.target);

	}

	hover = evt => {
		console.log("HHHHHHHover");
		console.log(evt);
		console.log(evt.target);
	}

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
				hover={this.hover}
				children={
					<Segment key="segment" as="div" size="huge" style={style}>
						<Header as="h1" textAlign={"left"}>
							Hello, I'm 71emj
							<Header.Subheader>
								full-stack developer and react lover
							</Header.Subheader>
						</Header>
						<br />
						<p>
							I am a full-stack developer living in Charlotte, with love for
							both UX design and server-side logic. I am also passionate about
							building computers, making coffee, and learning new technologies.{" "}
							<br />
							<br />
							If you would like to talk about web, technology, or how to build
							your first computer feel free to connect via
							<a href="mailto:someone@example.com?Subject=Hello%20again" target="_top"> Email </a>
							or <a href="https://linkedin.com/in/timothyjeng" target="_blank" > LinkedIn.</a>
						</p>
						<br/>
					</Segment>
				}
			/>
		);
	}
}

export default About;
