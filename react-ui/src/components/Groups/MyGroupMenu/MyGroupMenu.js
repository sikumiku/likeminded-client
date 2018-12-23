import React from 'react';
import classes from './MyGroupMenu.module.css'
import NavigationItem from '../../Navigation/NavigationItem/NavigationItem';

const myGroupMenu = (props) => {
    return (
        <div className="col-lg-3">
            <h1 className={classes.MyGroupMenu}>MINU GRUPID</h1>
            <ul className={classes.MyGroupMenu}>
                <NavigationItem link="/createGroup">
                    Loo uus grupp
                </NavigationItem>
                <NavigationItem link="/groups" exact>
                    Kõik grupid
                </NavigationItem>
            </ul>
        </div>
    );
};

export default myGroupMenu;