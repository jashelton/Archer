import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { profileService, followsService } from '../services';
import { snackbarActions } from '../actions';

// Material
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  flex: {
    flex: 1,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

class ProfilePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      data: null
    };

    // Could display /:username in the url, but pass user_id into the service to prevent the backend from having the get user.
    this.handleFollowing = this.handleFollowing.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
  }

  componentWillMount() {
    const user = this.props.match.params.user;
    const current_user = this.props.authentication.user.current_user.id;
    this.setState({user});

    profileService.created(user, current_user)
      .then(
        polls => { this.setState({data: polls.data}) },
        error => this.props.dispatch(snackbarActions.open(`${error}`)) // If the user doesn't exist, should redirect to 404
      );
  }

  handleFollowing() {
    this.state.data.social.is_following ? this.unfollowUser() : this.followUser();
  }

  followUser() {
    followsService.follow(this.state.data.user_id, this.props.authentication.user.current_user.id)
      .then(
        res => {
          const { data } = this.state;
          const social = data.social;

          social.is_following = 1;
          social.followers ++;

          this.setState({data});
          this.props.dispatch(snackbarActions.open(`${res.data} ${this.state.user}`));
        },
        error => this.props.dispatch(snackbarActions.open(`${error}`))
      );
  }

  unfollowUser() {
    followsService.unfollow(this.state.data.user_id, this.props.authentication.user.current_user.id)
      .then(
        res => {
          const { data } = this.state;
          const social = this.state.data.social;
          social.is_following = 0;
          social.followers --;
          this.setState({data});
          this.props.dispatch(snackbarActions.open(`${res.data} ${this.state.user}`))
        },
        error => this.props.dispatch(snackbarActions.open(`${error}`))
      );
  }

  render() {
    const { data, user } = this.state;
    const { classes, authentication } = this.props;

    return(
      <div>
        {
          data &&
          <div>
            <Grid container>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <div>
                      {user}
                    </div>
                    <div>
                      Following {data.social.following}
                    </div>
                    <div>
                      Followers {data.social.followers}
                    </div>
                    { user !== authentication.user.current_user.username &&
                      <div>
                        <Button raised={true} color="primary" className={classes.button} onClick={this.handleFollowing}>
                          {data.social.is_following ? 'Unfollow' : 'Follow'}
                        </Button>
                      </div>
                    }
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card>
                  {/* Filter on the FE to display 'completed' or 'created' */}
                  <CardHeader
                    title="Activity"
                  />
                  <CardContent>
                    <div className={classes.demo}>
                      <List dense={true}>
                        {data.activity.map(action => (
                          <ListItem key={action.id}>
                            <ListItemAvatar>
                              <Avatar>
                                <Icon>{action.action === 'created' ? 'create' : 'assignment_turned_in'}</Icon>
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={<Link to={`/question/${action.poll_id}`}>{action.question}</Link>}
                              secondary={action.created_at}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        }
      </div>
    )
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { authentication } = state;

  return {
    authentication
  };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export default withStyles(styles)(connectedProfilePage);
