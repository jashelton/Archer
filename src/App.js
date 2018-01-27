import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppLayout from './components/AppLayout.js';
import Reboot from 'material-ui/Reboot';
import './App.css';

// NOTES:
  // .env setup:
    // https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="app-container">
          <Reboot />
          <AppLayout />
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
