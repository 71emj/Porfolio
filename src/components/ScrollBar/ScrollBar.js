import React, { Component } from "react";
import "./style.css";

// scrollbar is only a view element, i.e. no logic
class ScrollBar extends Component {

	get DOMS() {
		const scrollbar = document.querySelector(".--scrollbar");
		const html = document.documentElement;
		const docHeight = html.scrollHeight;
		const scrollbarLength = Math.floor(70 * window.innerHeight / docHeight);
		return { scrollbar, scrollbarLength, docHeight, html };
	}

	get scrollDist() {
		const { html, docHeight } = this.DOMS;
		const { position } = this.props;
		const scrollTop = html.scrollTop;
		const scroll = this.prevScroll <= scrollTop ? (position - scrollTop) : (scrollTop - position);
		return scroll * (100 / docHeight) * 0.5;
	}

	get TID() {
		return this.timeoutId;
	}

	set TID(refId) {
		this.timeoutId = refId;
	}

	componentDidMount() {
		const { scrollbar, scrollbarLength, docHeight } = this.DOMS;
		scrollbar.style.height = scrollbarLength + "vh";
		// this.prevScroll = window.scrollY;
		this.findScrollBarPosition();
		window.addEventListener("scroll", evt => {
			this.prevScroll = window.pageYOffset * 100 / docHeight;
			this.requestTick();
		});
		// window.addEventListener("scroll", this.throttledScrollEvent);
	}

	scrollEvent = evt => {
		this.displayScrollbar();
		this.scroll();
		this.ticking = false;
	}
	
	requestTick() {
		if (!this.ticking) {
			window.requestAnimationFrame(this.scrollEvent);
			this.ticking = true;
		}
	}

	// throttledScrollEvent = evt => {
	// 	if (this.TID) {
	// 		return;
	// 	}
	// 	// the purpose is to keep event from firing too many times
	// 	this.TID = setTimeout(() => {
	// 		const { scrollbar, scrollbarLength, html } = this.DOMS;
	// 		this.prevScroll = html.scrollTop /*window.scrollY*/;
	// 		// this.prevScroll = this.props.position;
	// 		this.TID = null;
	// 	}, 1000); 

	// 	this.displayScrollbar();
	// 	this.scroll();
	// }

	displayScrollbar() {
		const { scrollbar } = this.DOMS;
		const setOpacity = val => (scrollbar.style.opacity = val ? val : 0);
		setOpacity(1);
		setTimeout(setOpacity, this.props.fadeTime);
	}

	scroll() {
		const { scrollbar, scrollbarLength, docHeight } = this.DOMS;
		const { position, limit } = this.props; // previous position
		const dist = this.scrollDist;

		// use rebounce instead of dynamic capture
		// 
		const min = position - limit - 5;
		const max = position + limit + 5;

		// set a scroll dist limit 
		// every frame look to seee if exceed limit
		// not animate distance
		// yes stop 

		const currentPosition = window.pageYOffset * 100 / docHeight;
		const movingDown = dist < 0 ? true : false;
		const destination = dist < 0 
			? position + limit 
			: position - limit;
		const distanceYetToTravel = Math.abs(destination - position);
		
		const scrollY = movingDown 
			? currentPosition < max 
				? 1 : -1 
			: currentPosition > min 
				? -1 : 1;

		const nextPosition = this.prevScroll >= max 
			? max 
			: this.prevScroll <= min 
			? min 
			: this.prevScroll;

		console.log({nextPosition, currentPosition, max, min});
		// console.log(dist);

		// const locateScrollbar = !position || position + scrollbarLength < 100
		// 	? position + (dist < 0 ? -10 : 10)
		// 	: position - scrollbarLength + 10;

		// const containScrollbar = locateScrollbar >= 100 - scrollbarLength
		// 	? 115 - scrollbarLength 
		// 	: locateScrollbar <= -15
		// 	? -15 + scrollbarLength
		// 	: locateScrollbar;
		scrollbar.style.top = `${nextPosition}vh`;
	}

	componentDidUpdate() {
		// this.findScrollBarPosition();
	}

	findScrollBarPosition() {
		const { scrollbar, scrollbarLength } = this.DOMS;
		const { position } = this.props; // updated position

		const locateScrollbar = !position || position + scrollbarLength < 100
			? position 
			: position - scrollbarLength;

		console.log({ locateScrollbar, scrollbarLength, position });
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


// animate scroll
// once the component received the updated props
// animate scroll to 

