import React, { Component } from "react";
import Banner from "../Banner";
import "./style.css";

class Welcome extends Component {
	render() {
		return (
			<Banner
				bannerkey="welcome"
				show={this.props.show}
				transition={true}
				animateType={this.props.type}
				duration={{ show: 750, hide: 0 }}
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