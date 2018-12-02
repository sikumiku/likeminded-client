import React, { Component } from 'react';
import '../App.css';
import { withRouter } from 'react-router-dom';
import people_image from '../resources/home-page-people.png';
import logo_and_slogan from '../resources/LogoandSlogan.png';
import blog_spirit_island from '../resources/spiritisland.png';
import BodyBackgroundColor from 'react-body-backgroundcolor';

class Home extends Component {
    state = {
        isLoading: true,
        isAuthenticated: false,
        user: undefined
    };

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        // const response = await fetch('http://localhost:8080/api/v1/events');
        // const body = await response.text();
        // console.log(JSON.parse(body));
        // if (body === '') {
        //     this.setState(({isAuthenticated: false}))
        // } else {
        //     this.setState({isAuthenticated: true, user: JSON.parse(body)})
        // }
    }

    render() {

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

                            <div id="carouselExampleIndicators" className="carousel slide my-4" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                </ol>
                                <div className="carousel-inner" role="listbox">
                                    <div className="carousel-item active">
                                        <img className="d-block img-fluid" src="http://placehold.it/900x350" alt="First slide"/>
                                    </div>
                                    <div className="carousel-item">
                                        <img className="d-block img-fluid" src="http://placehold.it/900x350" alt="Second slide"/>
                                    </div>
                                    <div className="carousel-item">
                                        <img className="d-block img-fluid" src="http://placehold.it/900x350" alt="Third slide"/>
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>

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