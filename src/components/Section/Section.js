import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import Progress from "../Progress";
import "./style.css";

class Section extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cur: 0,
			scroll: 0
		};
	}

	setProgress(flag, scrollY) {
		const { cur } = this.state;
		const setcur = cur < 2 ? cur + flag : 2;

		this.setState({
			cur: cur + flag,
			scroll: scrollY
		});
	}

	preventScrollDown(target) {
		const scrollY = window.scrollY;
		const { cur, scroll } = this.state;

		console.log("here");
		if (cur === 0 && scrollY < target) {
			return;
		}

		let flag = 0;

		if (cur !== 0 && scrollY < scroll) {
			flag = -1;
		} else if (cur < 2) {
			console.log("cur < 2");
			flag = 1;
		}

		this.setProgress(flag, scrollY);
	}

	sectionScroll = e => {
		// console.log(this);

		const section = document.querySelector("section.--content");
		const fixednav = document.querySelector("nav"); // pass as props
		const navH = parseInt(fixednav.getClientRects()[0].height); // pass as props
		const sectionT = parseInt(section.getClientRects()[0].top);

		if (navH >= sectionT) {
			// window.onmousewheel = e => e.preventDefault();
			window.scrollTo(0, section.offsetHeight);
			document.body.style.overflow = "hidden";
			console.log("precisely");
			this.onscroll = this.preventScrollDown(section.offsetHeight);
		}
	};

	componentDidMount() {
		window.onscroll = this.sectionScroll;
		// document.getElementById("scroller").addEventListener("hover", this.sectionScroll);
		// <div  onmouseover="document.body.style.overflow='hidden';"  onmouseout="document.body.style.overflow='auto';"></div>
	}

	render() {
		const [left, mid, right] = this.props.colWidth;
		const { name, content, sub } = this.props.text;
		const { cur } = this.state;
		console.log("this is cur %s", cur);

		return (
			<Grid.Row
				id="scroller"
				verticalAlign="top"
				as="section"
				className="--content"
				color={this.props.color}
			>
				<Grid.Column width={left} />{" "}
				<Grid.Column width={mid}>
					<h1 className="--section-title"> {name} </h1> <h4> {sub ? sub : ""} </h4>{" "}
					<h3> {content} </h3>{" "}
				</Grid.Column>{" "}
				<Grid.Column width={right}>
					<Progress amount={3} active={cur} />{" "}
				</Grid.Column>{" "}
			</Grid.Row>
		);
	}
}

export default Section;
