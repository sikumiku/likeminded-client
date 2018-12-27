import React from "react";
import classes from './Carousel.module.css';
import {
    Carousel,
    CarouselControl,
    CarouselIndicators,
} from 'reactstrap';

export default (props) =>
    <Carousel
        className={classes.Carousel}
        activeIndex={props.activeIndex}
        next={props.next}
        previous={props.previous}
    >
        <CarouselIndicators items={props.items} activeIndex={props.activeIndex} onClickHandler={props.goToIndex} />
        {props.slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={props.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={props.next} />
    </Carousel>;
