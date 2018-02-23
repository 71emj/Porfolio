import React, { Component } from "react";
import { Container, Transition } from "semantic-ui-react";
import "./style.css";

class Banner extends Component {

	render() {
		const { animateType, show, duration, children, bannerkey, alignType } = this.props;
		const alignClass = new Map([["flex end", "--alignEnd "], ["flex start", "--alignStart"]]);

		let classList = "--flex --wrapper --column ";
		classList += alignType ? alignClass.get(alignType) : ""; // can extend further

		return (
			<Container as="div" key={bannerkey} className={classList}>
				<Transition animation={animateType || "fade"} visible={show} duration={duration || 500}>
						{children}
				</Transition>
			</Container>
		);
	}
}

export default Banner;