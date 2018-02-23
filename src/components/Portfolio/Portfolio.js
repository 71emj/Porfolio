import React, { Component } from "react";
import { Segment, Header, Icon } from "semantic-ui-react";
import Banner from "../Banner";
import "./style.css";

class Portfolio extends Component {
	content() {
		const style = {
			background: "none",
			boxShadow: "none",
			border: "none",
			color: "white"
		};

		return (
			<Segment key="aboutMe" as="div" size="huge" style={style}>
				<Header as="h1" textAlign="center" style={style}>
					PORTFOLIO UNDER CONSTRUCTION ...
				</Header>
			</Segment>
		);
	}

	render() {
		const { show, type } = this.props;

		return (
			<div className={`--content --medium ${show ? "" : "--hidden"}`} id="portfolio">
				<Banner
					bannerkey="portfolio"
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

export default Portfolio;
