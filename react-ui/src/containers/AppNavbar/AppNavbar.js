import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../../resources/LIKEMINDED_HEADING_LOGOV3.png';
import classes from './AppNavbar.module.css';

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dropdownOpen: false
        };
        this.toggle = this.toggle.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleDropdown() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    handleLogout = (e) => {
        this.props.onLogOut();
    };

    render() {

        let userName = "";
        let imagePath = "";

        if (this.props.currentUser) {
            userName = this.props.currentUser.username;
            imagePath = this.props.currentUser.imageBase64;
        }

        return <Navbar expand="md" light>
            <NavbarBrand tag={Link} to="/">
                <img src={logo} height="50" alt="LikeMinded logo" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/events"><span id="navbar-link">ÜRITUSED</span></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/groups"><span id="navbar-link">GRUPID</span></NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink tag={Link} to="/people"><span id="navbar-link">LEIA INIMESI</span></NavLink>
                    </NavItem>
                    {this.props.isAuthenticated
                        ?
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                                <DropdownToggle className={classes.DropdownToggle} caret>
                                    <img className={classes.ProfileImage} src={imagePath} alt=""/>{userName.toUpperCase()}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <NavLink tag={Link} to="/settings"><span id="navbar-link">MINU PROFIIL</span></NavLink>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavLink tag={Link} to="/" onClick={this.handleLogout}><span id="navbar-link">VÄLJU</span></NavLink>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        :
                        <NavItem>
                            <NavLink tag={Link} to="/login"><span id="navbar-link">SISENE</span></NavLink>
                        </NavItem>
                    }
                </Nav>
            </Collapse>
        </Navbar>;
    }
}

export default AppNavbar;