import React from "react";
import { Embed } from "semantic-ui-react";
import "./style.css";

const Video = props => (
	<div className="--video">
		<video src={props.src} autoPlay loop active />
	</div>
);

export default Video;
