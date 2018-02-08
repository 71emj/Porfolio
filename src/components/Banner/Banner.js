import React, { Component } from "react";
import Embed from "../Embed";
import { Container } from "semantic-ui-react";


class Banner extends Component {
	render() {
		return (
			<Container 
				as="div" 
				key="banner" 
				children={ Embed(this.props) }
				className="--banner"
			/>
		);
	}
}

export default Banner;