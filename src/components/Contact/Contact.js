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
		};

		const column = {
			width: "48%",
			margin: "0 1%",
			color: "white",
		}

		return (
			<Segment key="aboutMe" as="div" size="huge" style={style} className="--flex --wrapper --alignStart">
				<Header as="h2" textAlign={"left"} style={column}>
					Love to hear from you, let's connect!! &nbsp;
					<Header.Subheader style={{ color: "white" }}>
						<p>tim.jeng@gmail.com | 980-318-8118</p>
					</Header.Subheader>
				</Header>
				<div style={column} id="contactIcons">
					<a href="https://github.com/71emj/" target="_blank">
						<Icon link inverted circular={true} size="big" name="github alternate" />
					</a>
					<a href="mailto:someone@example.com?Subject=Hello%20again" target="_top" >
						<Icon link inverted circular={true} size="big" name="mail" />
					</a>
					<a href="https://www.linkedin.com/in/timothyjeng" target="_blank">
						<Icon link inverted circular={true} size="big" name="linkedin" />
					</a>
				</div>
			</Segment>
		);
	}

	render() {
		const { show, type } = this.props;

		return (
      <div className={`--content --medium ${show ? "" : "--hidden"}`} id="contact">
				<Banner
					bannerkey="contact"
					show={show}
					transition={true}
					animateType={type}
					duration={{ show: 500, hide: 0 }}
					children={this.content()}
				/>
			</div>
		);
	}
}

export default Contact;
