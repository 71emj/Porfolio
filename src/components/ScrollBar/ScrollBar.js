import React, { Component } from "react";
import "./style.css";

// scrollbar is only a view element, i.e. no logic
class ScrollBar extends Component {
	get DOMS() {
		const scrollbar = document.querySelector(".--scrollbar");
		const winHeight = window.innerHeight;
		const html = document.documentElement;
		const docHeight = html.offsetHeight;
		const scrollbarLength = winHeight / docHeight;
		return { docHeight, scrollbar, scrollbarLength, winHeight };
	}

	componentDidMount() {
		const { scrollbar, scrollbarLength } = this.DOMS;
		scrollbar.style.height = scrollbarLength;
		this.findScrollBarPosition();
		window.addEventListener("scroll", this.displayScrollbar);
	}

	displayScrollbar = (evt) => {
		const { scrollbar } = this.DOMS;
		const setOpacity = val => scrollbar.style.opacity = val ? val : 0;
		if (evt) {
			setOpacity(1);
			setTimeout(setOpacity, this.props.fadeTime);
		}
	}

	componentDidUpdate() {
		this.findScrollBarPosition();
	}

	findScrollBarPosition() {
		const { scrollbar, scrollbarLength, winHeight, docHeight } = this.DOMS;
		const { position } = this.props;
		console.log(position);
		const locateScrollbar = !position
			? position + scrollbarLength
			: position < 100
			? position - scrollbarLength / 2
			: position - scrollbarLength;

		scrollbar.style.top = `${locateScrollbar}vh`;
	}

	render() {
		return (
			<div className="--scrollbar-container">
				<div className="--scrollbar" />
			</div>
		);
	}
}

export default ScrollBar;