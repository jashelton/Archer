import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { profileService } from '../services';

// Material
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';

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

  }

  componentWillMount() {
    const user = this.props.match.params.user;
    this.setState({user});

    profileService.created(user)
      .then(
        polls => { this.setState({data: polls.data}) },
        error => console.log('error', error) // If the user doesn't exist, should redirect to 404
      )
  }

  render() {
    const { data, user } = this.state;
    const { classes } = this.props;

    return(
      <div>
        {
          data &&
          <div>
            <Grid container>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    {user}
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
                        {data.map(action => (
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

export default withStyles(styles)(ProfilePage);
