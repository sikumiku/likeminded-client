import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../resources/LIKEMINDED_HEADING_LOGOV3.png';
import navbarItemDivider from '../resources/pinkcircle2.svg';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar expand="md">
            <NavbarBrand tag={Link} to="/">
                <img src={logo} height="50" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/events"><span id="navbar-link">ÜRITUSED</span></NavLink>
                    </NavItem>
                    <img src={navbarItemDivider} />
                    <NavItem>
                        <NavLink href="http://localhost:3000"><span id="navbar-link">GRUPID</span></NavLink>
                    </NavItem>
                    <img src={navbarItemDivider} />
                    <NavItem>
                        <NavLink href="http://localhost:3000"><span id="navbar-link">LEIA INIMESI</span></NavLink>
                    </NavItem>
                    <img src={navbarItemDivider} />
                    <NavItem>
                        <NavLink href="http://localhost:3000"><span id="navbar-link">SISENE</span></NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}