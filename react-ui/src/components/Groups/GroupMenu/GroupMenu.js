import React from 'react';
import classes from './GroupMenu.module.css'
import NavigationItem from '../../Navigation/NavigationItem/NavigationItem';
import CategoryList from '../../CategoryList/CategoryList'

const groupMenu = (props) => {
    return (
        <div className="col-lg-3">
            <h1 className={classes.GroupMenu}>GRUPID</h1>
            <ul className={classes.GroupMenu}>
                <NavigationItem link="/createGroup">
                    Loo uus grupp
                </NavigationItem>
                <NavigationItem link="/myGroups" exact>
                    Minu grupid
                </NavigationItem>
            </ul>
            <CategoryList options={props.options} selectedOption={props.selectedOption} onOptionClick={props.onOptionClick}/>
        </div>
    );
};

export default groupMenu;