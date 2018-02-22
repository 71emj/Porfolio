import React, { Component } from "react";
import "./style.css";

// scrollbar is only a view element, i.e. no logic
class ScrollBar extends Component {

	get DOMS() {
		const scrollbar = document.querySelector(".--scrollbar");
		const html = document.documentElement;
		const docHeight = html.scrollHeight;
		const scrollbarLength = window.innerHeight / docHeight;
		return { scrollbar, scrollbarLength, docHeight, html };
	}

	get scrollDist() {
		const { html, docHeight } = this.DOMS;
		const { position } = this.props;
		const scrollTop = html.scrollTop;
		const scroll = this.prevScroll <= html.scrollTop ? position - scrollTop : scrollTop - position;
		return scroll * (100 / docHeight) * 0.5;
	}

	get TID() {
		return this.timeoutId;
	}

	set TID(refId) {
		this.timeoutId = refId;
	}

	componentDidMount() {
		const { scrollbar, scrollbarLength } = this.DOMS;
		scrollbar.style.height = scrollbarLength;
		this.prevScroll = window.scrollY;
		this.findScrollBarPosition();
		window.addEventListener("scroll", this.throttledScrollEvent);
	}

	throttledScrollEvent = evt => {
		if (this.TID) {
			return;
		}
		// the purpose is to keep event from firing too many times
		this.TID = setTimeout(() => {
			this.prevScroll = window.scrollY;
			this.TID = null;
		}, this.props.fadeTime * 0.8); 

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
		console.log("WE WILL READ THIS ONLY");
		console.log(dist);
		console.log("=======================================");

		const locateScrollbar = !position
			? position + scrollbarLength - (dist <= 0.5 ? 5 : 10)
			: position < 100
			? position - scrollbarLength / 2 + (dist / 2 < 5 ? -5 : (dist / 2)) 
			: position - scrollbarLength - (dist <= 0 ? dist : 0);

		const containScrollbar = locateScrollbar >= 100 
			? 100 - scrollbarLength 
			: locateScrollbar <= -15
			? -15 + scrollbarLength
			: locateScrollbar;

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
