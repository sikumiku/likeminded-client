import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

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
            <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink
                            href="http://localhost:3000">Esileht</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/events">Üritused </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="http://localhost:3000">Grupid </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="http://localhost:3000">Leia inimesi </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="http://localhost:3000">Sisene </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}