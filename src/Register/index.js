import React from 'react';
import { connect } from 'react-redux'; // LEARN: Look into connect
import { userActions } from '../actions';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      name: '',
      username: '',
      password: '',
      confirm_password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = event.target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);

    if (this.state.password === this.state.confirm_password) {
      console.log(this.state);
    } else {
      console.log('Passwords do not match, try again.')
    }
  }

  render() {
    return(
      <div>
        <h1>Register Page</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
            Username:
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <label>
            Confirm Password:
            <input type="password" name="confirm_password" value={this.state.confirm_password} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

// LEARN: need to dig into this function -> should help once digging into state
function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage); // LEARN: unclear
export { connectedRegisterPage as RegisterPage }; // LEARN: why?