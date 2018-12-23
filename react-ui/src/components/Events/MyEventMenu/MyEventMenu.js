import React from 'react';
import classes from './MyEventMenu.module.css'
import NavigationItem from '../../Navigation/NavigationItem/NavigationItem';

const myEventMenu = (props) => {
    return (
        <div className="col-lg-3">
            <h1 className={classes.MyEventMenu}>MINU ÜRITUSED</h1>
            <ul className={classes.MyEventMenu}>
                <NavigationItem link="/createEvent">
                    Loo uus üritus
                </NavigationItem>
                <NavigationItem link="/" exact>
                    Kõik üritused
                </NavigationItem>
            </ul>
        </div>
    );
};

export default myEventMenu;