import React, { Component } from "react";
import Banner from "../Banner";
import "./style.css";

class Welcome extends Component {
	render() {
		const duration = {
			show: 750,
			hide: 0
		};
		return (
			<Banner
				key="welcome"
				show={this.props.show}
				transition={true}
				animateType={this.props.type}
				duration={duration}
				children={
					<div>
						<img src="./assets/img/SVG/screen.svg" className="--monitor" />
						<img src="./assets/img/SVG/line1.svg" className="--lines" />
						<img src="./assets/img/SVG/line2.svg" className="--lines" />
					</div>
				}
			/>
		);
	}
}

export default Welcome;	