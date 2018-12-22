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

    validateEmail(e) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state
        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({ validate })
    }

    render() {

        let userName = "";

        if (this.props.currentUser) {
            userName = this.props.currentUser.username;
        }

        return <Navbar expand="md">
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
                                    <img className={classes.ProfileImage} src={window.location.origin + '/img/profile_image.png'} alt=""/>{userName.toUpperCase()}
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