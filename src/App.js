import React, { Component } from 'react';
import logo from './logo.svg';

// Routes
import Home from './home';

import { Switch, Route } from 'react-router';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header text-center">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Archer</h2>
        </div>
        <div className="app-container">
          <Switch>
            <Route exact path="/home" component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;