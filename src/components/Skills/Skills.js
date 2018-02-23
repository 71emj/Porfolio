import React, { Component } from "react";
import { Segment, Header, Icon } from "semantic-ui-react";
import Banner from "../Banner";
import "./style.css";

class Skills extends Component {
	content() {
		const style = {
			background: "none",
			boxShadow: "none",
			border: "none",
			color: "white"
		};

		return (
			<Segment key="aboutMe" as="div" size="huge" style={style}>
				<Icon link inverted circular={false} size="huge" name="html5" />
				<Icon link inverted circular={false} size="huge" name="css3" />
				<Icon link inverted circular={false} size="huge" name="server" />
				<Icon link inverted circular={false} size="huge" name="pied piper" />
			</Segment>
		);
	}

	render() {
		const { show, type } = this.props;

		return (
			<div className={`--content --medium ${show ? "" : "--hidden"}`} id="skills">
				<Banner
					bannerkey="skills"
					show={show}
					transition={true}
					animateType={type}
					duration={{ show: 500, hide: 0 }}
					hover={this.hover}
					children={this.content()}
				/>
			</div>
		);
	}
}

export default Skills;
