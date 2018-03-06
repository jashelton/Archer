import React from 'react';
import { Router, Route } from 'react-router';
import { history } from './helpers'

// Routes
import { PrivateRoute } from './components';
import { HomePage } from './Home';
import LoginPage from './Login';
import RegisterPage from './Register';
import ProfilePage from './ProfilePage';
import BookmarkPage from './BookmarkPage';
// TODO: Would like to import NewComponent, VoteComponent, and ViewComponent from ./Poll
import VoteComponent from './Poll/Vote/vote.component';
import ViewComponent from './Poll/View/view.component';
import NewComponent from './Poll/New/new.component';

export default class RouterTest extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          {/* Which routes should be protected? */}
          <Route exact path="/" component={HomePage} />
          <PrivateRoute exact path="/new-poll" component={NewComponent} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <PrivateRoute path="/question/:id" component={VoteComponent} />
          <Route path="/profile/:user" component={ProfilePage} />
          <PrivateRoute path="/results/:id" component={ViewComponent} />
          <PrivateRoute path="/my-list" component={BookmarkPage} />
        </div>
      </Router>
    );
  }
}
