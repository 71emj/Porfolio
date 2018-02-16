import React, { Component } from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import "./style.css";

// inorder to create scrolling effect, perhaps what i need is scrollto function
const linkobj = {
	home: {
		name: "Home",
		href: "#home"
	},
	about: {
		name: "About",
		href: "#about"
	},
	portfolio: {
		name: "Portfolio",
		href: "#portfolio"
	},
	contact: {
		name: "Contact",
		href: "#contact"
	},
	source: {
		name: "Github",
		href: "https://github.com/71emj/portfolio"
	}
};

// the delay is caused by the fact that the function is detecting scollY, which won't change until
// the end of event
// async should fix the problem
class Nav extends Component {
	rightMenu = () => {
		const links = linkobj;
		const linkItems = [];
		const isResponsive = window.innerWidth < 897;

		for (let elem in links) {
			const cur = links[elem];
			linkItems.push(
				isResponsive ? (
					<Dropdown.Item key={cur.name}> {cur.name} </Dropdown.Item>
				) : (
					<Menu.Item
						href={cur.href}
						link={true}
						key={cur.name}
						onClick={evt => setTimeout(() => { this.props.scrollTo(evt) }, 0)}
					>{cur.name}</Menu.Item>
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
			><Dropdown.Menu>{linkItems}</Dropdown.Menu>
			</Dropdown>
		) : (
			<Menu.Menu position="right" key="links">{linkItems}</Menu.Menu>
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
			>{this.props.logo}</Menu.Item>
		);
	};

	componentDidMount() {
		window.addEventListener("resize", () => { this.forceUpdate() });
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
