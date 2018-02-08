import React from "react";
import { Embed } from "semantic-ui-react";
import "./style.css";

const Video = props => (
	<video src={props.src} className="--video" autoPlay loop active />
);

export default Video;
