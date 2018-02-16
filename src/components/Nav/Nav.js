import React, { Component } from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import "./style.css";

const linkobj = {
	about: {
		name: "About",
		href: "#about"
	},
	contact: {
		name: "Contact",
		href: "#contact"
	},
	portfolio: {
		name: "Portfolio",
		href: "#portfolio"
	},
	source: {
		name: "Github",
		href: "https://github.com/71emj/portfolio"
	}
};

class Nav extends Component {
	state = {};

	rightMenu = () => {
		const { activeItem } = this.state;
		const links = linkobj;
		const linkItems = [];
		const isResponsive = window.innerWidth < 897;

		for (let elem in links) {
			const cur = links[elem];
			linkItems.push(
				isResponsive ? (
					<Dropdown.Item key={cur.name}>{cur.name}</Dropdown.Item>
				) : (
					<Menu.Item href={cur.href} link={true} key={cur.name}>
						{cur.name}
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
				key="links"
			>
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
			<Menu.Item
				header
				as="h2"
				key="logo"
				link={true}
				onClick={evt => window.location.assign("/")}
			>
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
				inverted={true}
				borderless={true}
				size="huge"
				as="nav"
				children={[this.main(), this.rightMenu()]}
				style={{ border: "0", boxShadow: "none" }}
			/>
		);
	}
}

export default Nav;