import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { connect } from 'react-redux';
import { history } from './helpers';
import logo from './logo.svg';

// Routes
import { PrivateRoute } from './components';
import { HomePage } from './Home';
import { LoginPage } from './Login';
import './App.css';

// NOTES:
  // .env setup:
    // https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables

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
              <PrivateRoute exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
            </div>
          </Router>
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
