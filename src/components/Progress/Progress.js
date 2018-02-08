import React, { Component } from "react";
import "./style.css";

class Progress extends Component {
	renderProgress() {
		const { amount, active } = this.props;
		console.log("active is %s", active);
		return Array(amount)
			.fill(null)
			.map((elem, index) => {
				return (
					<div
						className={`--vertical-progress ${active === index ? "active" : ""}`}
						id={index}
						key={`pro-${index}`}
					/>
				);
			});
	}

	render() {
		return (
			<div className="--progress">
				<div className="--progress-container">{this.renderProgress()}</div>
			</div>
		);
	}
}

export default Progress;
