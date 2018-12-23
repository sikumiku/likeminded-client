import React from 'react';
import classes from './EventMenu.module.css'
import NavigationItem from '../../Navigation/NavigationItem/NavigationItem';
import CategoryList from '../../CategoryList/CategoryList'

const eventMenu = (props) => {
    return (
            <div className="col-lg-3">
                <h1 className={classes.EventMenu}>ÜRITUSED</h1>
                <ul className={classes.EventMenu}>
                    <NavigationItem link="/createEvent">
                        Loo uus üritus
                    </NavigationItem>
                    <NavigationItem link="/myEvents" exact>
                        Minu üritused
                    </NavigationItem>
                </ul>
                <CategoryList options={props.options} selectedOption={props.selectedOption} onOptionClick={props.onOptionClick}/>
            </div>
    );
};

export default eventMenu;