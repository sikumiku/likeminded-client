import React, { Component } from 'react';
import '../App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { withCookies } from 'react-cookie';
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
        const {cookies} = props;
        this.state.csrfToken = cookies.get('XSRF-TOKEN');
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
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

    login() {
        let port = (window.location.port ? ':' + window.location.port : '');
        if (port === ':3000') {
            port = ':8080';
        }
        window.location.href = '//' + window.location.hostname + port + '/private';
    }

    logout() {
        fetch('/api/logout', {method: 'POST', credentials: 'include',
            headers: {'X-XSRF-TOKEN': this.state.csrfToken}}).then(res => res.json())
            .then(response => {
                window.location.href = response.logoutUrl + "?id_token_hint=" +
                    response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
            });
    }

    render() {
        const message = this.state.user ?
            <h2>Welcome, {this.state.user.username}!</h2> :
            <p>Palun sisenege, et lisada uusi üritusi.</p>;

        const button = this.state.isAuthenticated ?
            <div>
                <Button color="link"><Link to="/events">Manage JUG Tour</Link></Button>
                <br/>
                <Button color="link" onClick={this.logout}>Logout</Button>
            </div> :
            <Button color="primary" onClick={this.login}>Login</Button>;

        return (
            <BodyBackgroundColor backgroundColor='#eee2dc'>
            <div>
                <AppNavbar/>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3">
                            <h1 class="my-4" color="#9c3159">Tere tulemast!</h1>
                            <img src={people_image} width="254" />
                            <p/>
                            <div>
                                "Tabletop" mängud ehk lauapealsed mängud hõlmavad endas igasugu mänge, mida tüüpiliselt mängitakse mitmekesi laua ümber.
                                <p/>
                                Antud veebilehel on võimalik leida erinevaid "tabletop" temaatilisi üritusi, korraldada nii ühekordseid kui ka korduvaid üritusi, leida mängukaaslasi ning moodustada gruppe.
                                <p/>
                                Head mängimist!
                            </div>
                        </div>
                        <div class="col-lg-9">

                                <img class="img-fluid" src={logo_and_slogan}/>

                            <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
                                <ol class="carousel-indicators">
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                </ol>
                                <div class="carousel-inner" role="listbox">
                                    <div class="carousel-item active">
                                        <img class="d-block img-fluid" src="http://placehold.it/900x350" alt="First slide"/>
                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block img-fluid" src="http://placehold.it/900x350" alt="Second slide"/>
                                    </div>
                                    <div class="carousel-item">
                                        <img class="d-block img-fluid" src="http://placehold.it/900x350" alt="Third slide"/>
                                    </div>
                                </div>
                                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>

                            <div class="row">

                                <div class="col-lg-12 col-md-6 mb-4">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-6 col-md-4">
                                                    <h4 class="card-title">
                                                        Spirit Island - Jagged Earth kickstarter on alanud
                                                    </h4>
                                                    <h5>22/05/2018</h5>
                                                    <img src={blog_spirit_island} width="200"/>
                                                </div>
                                                <div class="col-6 col-md-8">
                                                    <p class="card-text">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
                                                        <p/>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
                                                        <p/>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
                                                        <p/>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="card-footer">
                                            <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-6 mb-4">
                                    <div class="card h-100">
                                        <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""/></a>
                                        <div class="card-body">
                                            <h4 class="card-title">
                                                <a href="#">Item Two</a>
                                            </h4>
                                            <h5>$24.99</h5>
                                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur! Lorem ipsum dolor sit amet.</p>
                                        </div>
                                        <div class="card-footer">
                                            <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-6 mb-4">
                                    <div class="card h-100">
                                        <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""/></a>
                                        <div class="card-body">
                                            <h4 class="card-title">
                                                <a href="#">Item Three</a>
                                            </h4>
                                            <h5>$24.99</h5>
                                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>
                                        </div>
                                        <div class="card-footer">
                                            <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-6 mb-4">
                                    <div class="card h-100">
                                        <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""/></a>
                                        <div class="card-body">
                                            <h4 class="card-title">
                                                <a href="#">Item Four</a>
                                            </h4>
                                            <h5>$24.99</h5>
                                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>
                                        </div>
                                        <div class="card-footer">
                                            <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-6 mb-4">
                                    <div class="card h-100">
                                        <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""/></a>
                                        <div class="card-body">
                                            <h4 class="card-title">
                                                <a href="#">Item Five</a>
                                            </h4>
                                            <h5>$24.99</h5>
                                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur! Lorem ipsum dolor sit amet.</p>
                                        </div>
                                        <div class="card-footer">
                                            <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-6 mb-4">
                                    <div class="card h-100">
                                        <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""/></a>
                                        <div class="card-body">
                                            <h4 class="card-title">
                                                <a href="#">Item Six</a>
                                            </h4>
                                            <h5>$24.99</h5>
                                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>
                                        </div>
                                        <div class="card-footer">
                                            <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
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

export default withCookies(Home);