import React, { Component } from "react";
import Embed from "../Embed";
import { Container, Transition, List } from "semantic-ui-react";
import "./style.css";

class Banner extends Component {
	render() {
		return (
			<Container as="div" key="banner" className="--flex --wrapper">
				<Transition animation="fade up" visible={this.props.show} duration={{ show: 750, hide: 0 }}>
					<div>
						<img src="./assets/img/SVG/screen.svg" className="--monitor" />
						<img src="./assets/img/SVG/line1.svg" className="--lines" />
						<img src="./assets/img/SVG/line2.svg" className="--lines" />
					</div>
				</Transition>
			</Container>
		);
	}
}

export default Banner;

// <Transition.Group
// 					as={List}
// 					animation="fade up"
// 					duration={750}
// 					visible={this.props.show}
// 				>
// 					<List.Item key="primary">
// 						<img src="./assets/img/SVG/screen.svg" className="--monitor" />
// 					</List.Item>
// 					<List.Item key="first">
// 						<img src="./assets/img/SVG/line1.svg" className="--lines" />
// 					</List.Item>
// 					<List.Item key="second">
// 						<img src="./assets/img/SVG/line2.svg" className="--lines" />
// 					</List.Item>
// 				</Transition.Group>

// <Transition.Group
//           as={List}
//           duration={200}
//           divided
//           size='huge'
//           verticalAlign='middle'
//         >
//           {items.map(item => (
//             <List.Item key={item}>
//               <Image avatar src={`/assets/images/avatar/small/${item}.jpg`} />
//               <List.Content header={_.startCase(item)} />
//             </List.Item>
//           ))}
//         </Transition.Group>
