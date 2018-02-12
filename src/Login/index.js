import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userActions } from '../actions';

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    // const { username, password, submitted } = this.state;
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password))
    }
  }

  render() {
     // const { loggingIn } = this.props;
    // const { username, password, submitted } = this.state;
    const { username, password } = this.state;
    const { classes } = this.props;

    return (
      <div className="login-view container">
        <Card className={classes.card}>
          <CardHeader
            title="Login"
          />
          <form onSubmit={this.handleSubmit}>
            <CardContent>
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
              <div className={classes.textField}>Not a user? <Link to={'/register'}>Register</Link></div>
            </CardContent>
            <CardActions>
              <Button dense raised={true} color="primary" className={classes.flex} onClick={this.handleSubmit}>
                Login
              </Button>
            </CardActions>
          </form>
          </Card>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

export default compose(withStyles(styles), connect(mapStateToProps))(LoginPage);
