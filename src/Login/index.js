import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; // LEARN: Look into connect
import { userActions } from '../actions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props); // LEARN: refresh on super

    // reset login status
    this.props.dispatch(userActions.logout());

    // initialize state
    this.state = {
      username: '',
      password: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); // LEARN: refresh on this
  }

  handleChange(e) {
    const { name, value } = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password, submitted } = this.state;
    const { dispatch } = this.props; // LEARN: not sure what this is
    if (username && password) {
      dispatch(userActions.login(username, password)) // LEARN: look into dispatch
    }
  }

  render() {
    const { loggingIn } = this.props; // LEARN: need to check props to see what logginIn is.  For spinner?
    const { username, password, submitted } = this.state; // LEARN: Why is this here and in the handle submit function?
    return (
      <div className="login-view container">
        <h2>Login</h2>
        <form name="login-form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
          </div>
        </form>
      </div>
    );
  }
}

// LEARN: need to dig into this function -> should help once digging into state
function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage); // LEARN: unclear
export { connectedLoginPage as LoginPage }; // LEARN: why?
