import React, { Component } from "react";
import Banner from "../Banner";
import "./style.css";

class About extends Component {
	render() {
		const duration = {
			show: 750,
			hide: 0
		};
		return (
			<Banner
				key="about"
				show={this.props.show}
				transition={true}
				animateType={this.props.type}
				duration={duration}
				children={
					<div>
						<p>
							Hi there - I'm a North Carolina native now lucky to call Colorado
							home (fun fact, the sunset picture was taken off Highway 7 in
							Broomfield circa Summer 2014). I recently graduated from UNC
							Charlotte Web Development Boot Camp with a focus on Front End and
							Full Stack Web Development. It's not uncommon to hear people speak
							of their dream job or career aspirations. I'm thankful to have
							found and established mine as a Web Developer. It’s like -
							figuring out the subway system in a new city, or the puzzle
							strategy of starting with border pieces - except better. Your hard
							work, your code, is displayed directly in front of you, and can be
							shared with the world to create it a better place. Check out some
							of my work below!
						</p>
					</div>
				}
			/>
		);
	}
}

export default About;