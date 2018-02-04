import React from 'react';
import { Router, Route } from 'react-router';
import { history } from './helpers'

// Routes
import { PrivateRoute } from './components';
import { HomePage } from './Home';
import { CreatePage } from './New';
import { LoginPage } from './Login';
import { RegisterPage } from './Register';
import { QuestionDetailsPage } from './QuestionDetails';
import { ProfilePage } from './ProfilePage';
import { ResultsPage } from './Results';

export default class RouterTest extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          {/* Which routes should be protected? */}
          <Route exact path="/" component={HomePage} />
          <PrivateRoute exact path="/new-poll" component={CreatePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <PrivateRoute path="/question/:id" component={QuestionDetailsPage} />
          <Route path="/profile/:user" component={ProfilePage} />
          <PrivateRoute path="/results/:id" component={ResultsPage} />
        </div>
      </Router>
    );
  }
}
