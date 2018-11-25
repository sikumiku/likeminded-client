import React, {Component} from 'react';
import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import EventList from './components/EventList';
import EventEdit from './components/EventEdit';
import {CookiesProvider} from 'react-cookie';

class App extends Component {
    render() {
        return (
            /*<CookiesProvider>*/
                <Router>
                    <Switch>
                        <Route path='/' exact={true} render={Home.render}/>
                        <Route path='/events' exact={true} render={EventList.render}/>
                        <Route path='/events/:id' render={EventEdit.render}/>
                    </Switch>
                </Router>
            /* </CookiesProvider>*/
        )
    }
}

export default App;
