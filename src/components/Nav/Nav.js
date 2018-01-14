import React, { Component } from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import "./style.css";

class Nav extends Component {
	rightMenu = () => {
		const links = this.props.link;
		const linkItems = [];
		const isResponsive = window.innerWidth < 897;

		for (let elem in links) {
			linkItems.push(
				isResponsive ? (
					<Dropdown.Item key={elem}>{links[elem]}</Dropdown.Item>
				) : (
					<Menu.Item link={true} key={elem} >
						{links[elem]}
					</Menu.Item>
				)
			);
		}

		return isResponsive ? (
			<Dropdown 
				pointing="top"
				icon="content"
				text="Menu&nbsp;&nbsp;"
				item
				simple={true}
				className="link right"
				key="links">
				<Dropdown.Menu>{linkItems}</Dropdown.Menu>
			</Dropdown>
		) : (
			<Menu.Menu position="right" key="links">
				{linkItems}
			</Menu.Menu>
		);
	};

	main = () => {
		return (
			<Menu.Item header as="h3" key="logo">
				{this.props.logo}
			</Menu.Item>
		);
	};

	componentWillMount() {
		window.addEventListener("resize", () => {
			this.forceUpdate();
		});
	}

	render() {
		return (
			<Menu
				fixed="top"
				inverted={false}
				borderless={false}
				size="huge"
				as="nav"
				items={[this.main(), this.rightMenu()]}
				onItemClick={e => {
					console.log(e.target);
				}}
				style={{ border: "0", boxShadow: "none" }}
			/>
		);
	}
}

export default Nav;
