import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import Progress from "../Progress";
import "./style.css";

class Section extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cur: 0
		};
	}

	setProgress(flag) {
		const {cur} = this.state;

		this.setState({
			cur: cur < 2 ? (cur + flag) : 2
		});
	}

	preventScrollDown(target) {
		const scrollY = window.scrollY;
		const { cur } = this.state;

		console.log("here");
		if (cur === 0 && scrollY < target) {
			return;
		}

		window.scrollTo(0, target);
		const flag = scrollY < target ? -1 : 1; // the condition causes glitching effect
		this.setProgress(flag); 
	}

	sectionScroll = e => {
		const section = document.querySelector("section.--content");
		const fixednav = document.querySelector("nav"); // pass as props
		const navH = parseInt(fixednav.getClientRects()[0].height); // pass as props
		const sectionT = parseInt(section.getClientRects()[0].top);

		if (navH >= sectionT) {
			console.log("precisely");
			this.preventScrollDown(section.offsetHeight);
		}
	};

	componentDidMount() {
		window.addEventListener("scroll", this.sectionScroll);
	}

	render() {
		const [left, mid, right] = this.props.colWidth;
		const { name, content, sub } = this.props.text;

		return (
			<Grid.Row verticalAlign="top" as="section" className="--content" color={this.props.color}>
				<Grid.Column width={left} />
				<Grid.Column width={mid}>
					<h1 className="--section-title">{name}</h1>
					<h4>{sub ? sub : ""}</h4>
					<h3>{content}</h3>
				</Grid.Column>
				<Grid.Column width={right}>
					<Progress amount={3} active={this.state.cur} />
				</Grid.Column>
			</Grid.Row>
		);
	}
}

export default Section;
