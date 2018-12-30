import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import people_image from '../../resources/boardgameintroimg.png';
import logo_and_slogan from '../../resources/LogoandSlogan.png';
import blog_spirit_island from '../../resources/spiritisland.png';
import BodyBackgroundColor from 'react-body-backgroundcolor';
import {
    CarouselItem,
    CarouselCaption
} from 'reactstrap';
import Carousel from '../../components/UI/Carousel/Carousel';

const items = [
    {
        src: window.location.origin + '/img/reklaam1.png',
        altText: 'Lorien'
    },
    {
        src: window.location.origin + '/img/reklaam2.png',
        altText: 'Brain Games'
    },
    {
        src: window.location.origin + '/img/reklaam3.png',
        altText: 'Meeple Union'
    }
];

class Home extends Component {
    state = {
        isLoading: true,
        isAuthenticated: false,
        user: undefined,
        activeIndex: 0
    };

    async componentDidMount() {

    }

    onExiting = () => {
        this.animating = true;
    };

    onExited = () => {
        this.animating = false;
    };

    next = () => {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    };

    previous = () => {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    };

    goToIndex = (newIndex) => {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    };

    render() {

        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img src={item.src} alt={item.altText} />
                </CarouselItem>
            );
        });

        return (
            <BodyBackgroundColor backgroundColor='#eee2dc'>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <h1 className="my-4" color="#9c3159">Tere tulemast!</h1>
                                <img src={people_image} width="254" alt="People playing boardgames" />
                                <p/>
                                <div>
                                    "Tabletop" mängud ehk lauapealsed mängud hõlmavad endas igasugu mänge, mida tüüpiliselt mängitakse mitmekesi laua ümber.
                                    <p/>
                                    Antud veebilehel on võimalik leida erinevaid "tabletop" temaatilisi üritusi, korraldada nii ühekordseid kui ka korduvaid üritusi, leida mängukaaslasi ning moodustada gruppe.
                                    <p/>
                                    Head mängimist!
                                </div>
                            </div>
                            <div className="col-lg-9">

                                <img className="img-fluid" src={logo_and_slogan} alt="Logo and slogan"/>

                                <Carousel
                                    activeIndex={activeIndex}
                                    next={this.next}
                                    previous={this.previous}
                                    goToIndex={this.goToIndex}
                                    slides={slides}
                                    items={items}
                                />

                                <div className="row">

                                    <div className="col-lg-12 col-md-6 mb-4">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-6 col-md-4">
                                                        <h4 className="card-title">
                                                            Spirit Island - Jagged Earth kickstarter on alanud
                                                        </h4>
                                                        <h5>22/05/2018</h5>
                                                        <img src={blog_spirit_island} width="200" alt="Spirit Island board game"/>
                                                    </div>
                                                    <div className="col-6 col-md-8">
                                                        <div className="card-text">
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</p>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</p>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</p>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card-footer">
                                                <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BodyBackgroundColor>
        );
    }
}

export default withRouter(Home);