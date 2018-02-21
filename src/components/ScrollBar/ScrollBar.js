import React, { Component } from "react";
import "./style.css";

// scrollbar is only a view element, i.e. no logic
class ScrollBar extends Component {
	get DOMS() {
		const scrollbar = document.querySelector(".--scrollbar");
		const winHeight = window.innerHeight;
		const winScrollY = window.scrollY;
		const html = document.documentElement;
		const docHeight = html.scrollHeight;
		const scrollbarLength = winHeight / docHeight;
		return { scrollbar, scrollbarLength, winHeight, docHeight, winScrollY, html };
	}

	get scrollDist() {
		const { html, winHeight, docHeight } = this.DOMS;
		// currentPosition is windowScrollY
		console.log(winHeight);
		return (this.currentPosition - html.scrollTop) * 100 / docHeight;
	}

	componentDidMount() {
		const { scrollbar, scrollbarLength, winScrollY } = this.DOMS;
		scrollbar.style.height = scrollbarLength;
		this.currentPosition = winScrollY
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
		// this.scroll();
	}

	scroll() {
		const { scrollbar, scrollbarLength, winHeight, winScrollY } = this.DOMS;
		const { position } = this.props; // previous position
		// const locateScrollbar = position - this.scrollDist;
		const locateScrollbar = !position
			? position + scrollbarLength - this.scrollDist
			: position < 100
			? position - scrollbarLength / 2 - this.scrollDist
			: position - scrollbarLength - this.scrollDist;

		console.log({ position, s: this.scrollDist, locateScrollbar });
		this.currentPosition = winScrollY;
		scrollbar.style.top = `${locateScrollbar}vh`;
	}
	
	componentDidUpdate() {
		this.findScrollBarPosition();
	}
	
	findScrollBarPosition() {
		const { scrollbar, scrollbarLength, winHeight } = this.DOMS;
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