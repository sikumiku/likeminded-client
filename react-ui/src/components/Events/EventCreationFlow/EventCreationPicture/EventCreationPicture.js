import React from 'react';
import { Button } from "reactstrap";
import classes from './EventCreationPicture.module.css'
import Aux from '../../../../hoc/Auxilliary/Auxilliary';
import ImageUploader from 'react-images-upload';

const eventCreationPicture = (props) => {
    let form = null;

    if (!props.hidden) {
        form = (
                <div>
                    <div className={classes.ImageTitle}>Ürituse pildi üles laadimine</div>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Vali pilt'
                        onChange={props.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        withPreview
                        singleImage
                        label='Maksimum faili suurus: 5MB, aksepteeritud: jpg/png/gif'
                    />
                    <Button block onClick={() => props.onClick(props.activePage)}>EDASI</Button>
                </div>
        );
    }

    return (
        <Aux>
            <div className={classes.EventCreationPicture}>
                {form}
            </div>
        </Aux>
    );
};

export default eventCreationPicture;