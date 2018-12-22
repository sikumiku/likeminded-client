import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../../resources/LIKEMINDED_HEADING_LOGOV3.png';
import navbarItemDivider from '../../resources/pinkcircle2.svg';
import Aux from '../../hoc/Auxilliary/Auxilliary'
import classes from './AppNavbar.module.css';

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleLogout = (e) => {
        this.props.onLogOut();
    };

    render() {

        const userName = this.props.currentUser.username;

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
                    <img src={navbarItemDivider} alt="Navbar divider" />
                    <NavItem>
                        <NavLink tag={Link} to="/groups"><span id="navbar-link">GRUPID</span></NavLink>
                    </NavItem>
                    <img src={navbarItemDivider} alt="Navbar divider" />
                    <NavItem>
                        <NavLink tag={Link} to="/people"><span id="navbar-link">LEIA INIMESI</span></NavLink>
                    </NavItem>
                    {this.props.isAuthenticated
                        ? <Aux>
                            <img className={classes.ProfileImage} src={window.location.origin + '/img/profile_image.png'} alt="Profile Image"/>
                            <NavLink className={classes.ProfileUsername}>
                                {userName.toUpperCase()}
                            </NavLink>
                            <NavItem>
                                {/*Show downwards arrow here that opens up to LOGI V2LJA and SETTINGS*/}
                                <NavLink href="#" onClick={this.handleLogout}><span id="navbar-link">LOGI VÄLJA</span></NavLink>
                            </NavItem>
                        </Aux>
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