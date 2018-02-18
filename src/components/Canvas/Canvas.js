import React, { Component } from "react";
import "./style.css";

const PIXEL_RATIO = function() {
	const ctx = document.getElementById("canvas").getContext("2d"),
		dpr = window.devicePixelRatio || 1,
		bsr =
			ctx.webkitBackingStorePixelRatio ||
			ctx.mozBackingStorePixelRatio ||
			ctx.msBackingStorePixelRatio ||
			ctx.oBackingStorePixelRatio ||
			ctx.backingStorePixelRatio ||
			1;

	return dpr / bsr;
};

const createHiDPICanvas = function(ratio) {
	const { innerWidth: w, innerHeight: h } = window;
	if (!ratio) {
		ratio = PIXEL_RATIO();
	}
	const can = document.getElementById("canvas");
	console.log({ w, h, can });
	can.width = w * ratio;
	can.height = h * ratio;
	can.style.width = w + "px";
	can.style.height = h + "px";
	can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
	return can;
};

class Canvas extends Component {
	constructor(props) {
		super(props);
		this.canvas = "";
		this.ctx = "";
	}

	draw(corX, corY) {
		const ctx = this.ctx;
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		ctx.beginPath();
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.arc(corX, corY, 10, 0, Math.PI * 2);
		ctx.fill();
	}

	componentDidMount() {
		this.canvas = createHiDPICanvas();
		this.ctx = this.canvas.getContext("2d");
		
		window.onmousemove = evt => { this.draw(evt.clientX, evt.clientY); };
		window.addEventListener("resize", evt => createHiDPICanvas());
		window.addEventListener("click", evt => console.log(evt)); 
	}

	render() {
		return <canvas id="canvas"></canvas>;
	}
}

export default Canvas;