import React from "react";
import { Embed } from "semantic-ui-react";
import "./style.css";

const Video = props => (
	<Embed
		className="--video"
		placeholder={props.placeholder}
		children={[<video src={props.src} autoPlay loop />]}
		active={true}
	/>
);

export default Video;
