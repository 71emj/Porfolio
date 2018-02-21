import React, { Component } from "react";
import "./style.css";

// scrollbar is only a view element, i.e. no logic
class ScrollBar extends Component {
	get DOMS() {
		const scrollbar = document.querySelector(".--scrollbar");
		const winScrollY = window.scrollY;
		const html = document.documentElement;
		const docHeight = html.scrollHeight;
		const scrollbarLength = window.innerHeight / docHeight;
		return { scrollbar, scrollbarLength, docHeight, winScrollY, html	};
	}

	get scrollDist() {
		const { html, docHeight } = this.DOMS;
		return (this.currentPosition - html.scrollTop) * (100 / docHeight) * 0.5;
	}

	get TID() {
		return this.timeoutId;
	}

	set TID(refId) {
		this.timeoutId = refId;
	}

	componentDidMount() {
		const { scrollbar, scrollbarLength, winScrollY } = this.DOMS;
		scrollbar.style.height = scrollbarLength;
		this.currentPosition = winScrollY;
		this.findScrollBarPosition();
		window.addEventListener("scroll", this.throttledScrollEvent);
	}

	throttledScrollEvent = evt => {
		const timeoutId = this.TID;

		if (timeoutId) {
			return;
		}

		// the purpose is to keep event from firing too many times
		this.TID = setTimeout(() => { this.TID = null }, this.props.fadeTime * 0.9); 
		this.displayScrollbar(evt);
		this.scroll();
	}

	displayScrollbar() {
		const { scrollbar } = this.DOMS;
		const setOpacity = val => (scrollbar.style.opacity = val ? val : 0);
		setOpacity(1);
		setTimeout(setOpacity, this.props.fadeTime);
	}

	scroll() {
		const { scrollbar, scrollbarLength, winScrollY } = this.DOMS;
		const { position } = this.props; // previous position
		const dist = this.scrollDist;
		console.log(dist);

		const locateScrollbar = !position
			? position + scrollbarLength + (dist <= 0 ? 0 : dist)
			: position < 100
			? position - scrollbarLength / 2 + dist
			: position - scrollbarLength + (dist <= 0 ? dist : 0);

		const containScrollbar = locateScrollbar >= 100 
			? 100 - scrollbarLength 
			: locateScrollbar <= 0 
			? 0 + scrollbarLength
			: locateScrollbar;

		this.currentPosition = winScrollY; // might need to have react manage it's state
		scrollbar.style.top = `${containScrollbar}vh`;
	}

	componentDidUpdate() {
		this.findScrollBarPosition();
	}

	findScrollBarPosition() {
		const { scrollbar, scrollbarLength } = this.DOMS;
		const { position } = this.props; // updated position

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
