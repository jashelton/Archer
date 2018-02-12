import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bookmarkService, pollService } from '../services';

// Material
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';

const styles = theme => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  warn: { // TODO: Add warn to MuiTheme -> https://material-ui-next.com/style/color/
    color: '#F44336'
  }
});

class BookmarkPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null
    }

    bookmarkService.list(this.props.authentication.user.current_user.id)
      .then(
        res => this.setState({questions: res.data}),
        err => console.log('error', err) 
      );
  }

  deleteFavorite = questionIndex => event => {
    pollService.deleteFavorite(this.props.authentication.user.current_user.id, this.state.questions[questionIndex].poll_id)
      .then(
        res => {
          let questions = this.state.questions;
          questions.splice(questionIndex, 1);
          this.setState({questions});
        }
      )
  }

  render() {
    const { questions } = this.state;
    const { classes } = this.props;

    return(
      <div>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant="title" className={classes.title}>
              Bookmarked Polls:
            </Typography>
            <div className={classes.demo}>
              { !questions &&
                <span>You have no bookmarked polls.</span>
              }
              {questions &&
                <List dense={true}>
                  {questions.map((q, i) => (
                    <ListItem key={q.poll_id}>
                      <ListItemText
                        primary={<Link to={`/question/${q.poll_id}`}>{q.question}</Link>}
                        secondary="Other info related to this poll."
                      />
                      <ListItemSecondaryAction>
                        <IconButton aria-label="Delete" className={classes.warn} onClick={this.deleteFavorite(i)}>
                          delete
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              }
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

BookmarkPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { authentication } = state;
  return { authentication };
}

export default compose(withStyles(styles), connect(mapStateToProps))(BookmarkPage);
