import React, { Component } from "react";
import Banner from "../Banner";
import "./style.css";

class Welcome extends Component {
	render() {
		const { show, type } = this.props;
		return (
      <div className={`--content --small ${show ? "" : "--hidden"}`} id="home">
				<Banner
					bannerkey="welcome"
					show={show}
					transition={true}
					animateType={type}
					duration={{ show: 750, hide: 0 }}
					children={
							<div>
								<img src="./assets/img/SVG/screen.svg" className="--monitor" />
								<img src="./assets/img/SVG/line1.svg" className="--lines" />
								<img src="./assets/img/SVG/line2.svg" className="--lines" />
							</div>
					}
				/>
			</div>
		);
	}
}

export default Welcome;	