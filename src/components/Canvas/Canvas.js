import React, { Component } from "react";
import "./style.css";

class Canvas extends Component {
	// the constructor might not be neccessary
	constructor(props) {
		super(props);
	}

	get Canvas() {
		const can = this.canvas ? this.canvas : document.getElementById("canvas");
		const ctx = this.ctx ? this.ctx : can.getContext("2d");
		return { can, ctx };
	}

	componentDidMount() {
		this.createHighDPICanvas();
		window.addEventListener("mousemove", evt => this.draw(evt.clientX, evt.clientY));
		window.addEventListener("resize", evt => this.createHighDPICanvas());
		window.addEventListener("click", evt => console.log(evt));
	}

	createHighDPICanvas(ratio) {
		this.callibrateCanvas = ratio ? ratio : this.PIXEL_RATIO;
		return this;
	}

	set callibrateCanvas(ratio) {
		const { innerWidth: w, innerHeight: h } = window;
		const { can, ctx } = this.Canvas;
		can.width = w * ratio;
		can.height = h * ratio;
		can.style.width = w + "px";
		can.style.height = h + "px";
		ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
		console.log({ w, h, can });
		this.canvas = can;
		this.ctx = ctx;
	}

	get PIXEL_RATIO() {
		const { ctx } = this.Canvas;
		const dpr = window.devicePixelRatio || 1;
		const bsr =
			ctx.webkitBackingStorePixelRatio ||
			ctx.mozBackingStorePixelRatio ||
			ctx.msBackingStorePixelRatio ||
			ctx.oBackingStorePixelRatio ||
			ctx.backingStorePixelRatio ||
			1;

		return dpr / bsr;
	}

	draw(corX, corY) {
		const { ctx, can: canvas } = this.Canvas;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.arc(corX, corY, 10, 0, Math.PI * 2);
		ctx.fill();
	}

	render() {
		return <canvas id="canvas" />;
	}
}

export default Canvas;
