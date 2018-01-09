import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { connect } from 'react-redux';

import { history } from './helpers';

import logo from './logo.svg';

// NOTES:
  // .env setup:
    // https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables

// Routes
import { PrivateRoute } from './components';
import Home from './Home';
import { LoginPage } from './Login';

// import { Switch, Route } from 'react-router';
import './App.css';

function isLoggedIn() {
  console.log('hello');
  return false;
}

class App extends Component { 

  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    // history.listen((location, action) => {  // not implemented
    //   // clear alert on location change
    //   dispatch(alertActions.clear());
    // });
  }

  render() {
    const basePath = '/' + window.location.pathname.split('/')[1]; // LEARN: ehhh...?
    const { alert } = this.props;
    return (
      <div className="App">
        <div className="App-header text-center">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Archer</h2>
        </div>
        <div className="app-container">
          <Router history={history}>
            <div>
              <PrivateRoute exact path="/" component={Home} />
              <Route path="/login" component={LoginPage} />
            </div>
          </Router>
          {/* <Switch>
            <Route exact path="/home" render={() => isLoggedIn()}/>
            <Route exact path="/login" component={LoginPage}/>
          </Switch> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
