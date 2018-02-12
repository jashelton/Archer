import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { userActions } from '../actions';
import { userService } from '../services';

// Material
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  card: {
    width: '50%',
    margin: 'auto'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  flex: {
    flex: 1
  },
});

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
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
  }

  handleSubmit(event) {
    event.preventDefault();

    for (const key in this.state) {
      if (this.state[key] === '') {
        throw new Error('Invalid Form');
      }
    }

    if (this.state.password === this.state.confirm_password) {
      userService.register(this.state);
    } else {
      throw new Error('Passwords do not match');
    }
  }

  render() {
    const { classes } = this.props;

    return(
      <div>
        <Card className={classes.card}>
          <CardHeader
            title="Register"
          />
          <form onSubmit={this.handleSubmit}>
            <CardContent>
              <TextField
                id="name"
                label="Name"
                name="name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                id="username"
                label="Username"
                name="username"
                className={classes.textField}
                value={this.state.username}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                id="password"
                label="Password"
                name="password"
                type="password"
                className={classes.textField}
                value={this.state.password}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                id="confirm_password"
                label="Confirm Password"
                name="confirm_password"
                type="password"
                className={classes.textField}
                value={this.state.confirm_password}
                onChange={this.handleChange}
                margin="normal"
              />
              <div className={classes.textField}>Already a user? <Link to={'/login'}>Login</Link></div>
            </CardContent>
            <CardActions>
              <Button dense raised={true} color="primary" className={classes.flex} onClick={this.handleSubmit}>
                Register
              </Button>
            </CardActions>
          </form>
        </Card>
      </div>
    )
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

export default compose(withStyles(styles), connect(mapStateToProps))(RegisterPage);