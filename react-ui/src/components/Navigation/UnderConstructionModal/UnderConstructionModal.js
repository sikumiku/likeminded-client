import React from 'react';
import classes from './UnderConstructionModal.module.css';
import underConstruction from "../../../resources/UnderConstruction.png";

const underConstructionModal = () => {
    return (
        <div className={classes.ModalShow}>
            <section className={classes.ModalMain}>
                <img className={classes.Image} src={underConstruction} alt="Under Construction"/>
            </section>
        </div>
    );
};

export default underConstructionModal;