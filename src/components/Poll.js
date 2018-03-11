import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { pollService } from '../services';

// Material
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { snackbarActions } from '../actions';
import List, { ListItem, ListItemText } from 'material-ui/List';

const styles = theme => ({
  card: {
    width: '100%',
    marginBottom: '5px'
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
});

class Poll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: this.props.question
    };

    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  toggleFavorite() {
    this.state.question.favorite ? this.deleteFavorite() : this.addFavorite();
  }

  addFavorite() {
    pollService.addFavorite(this.props.authentication.user.current_user.id, this.props.question)
      .then(
        res => {
          let question = this.state.question;
          question.favorite = 1;
          this.setState({question});
          this.props.dispatch(snackbarActions.open('You have successfully added a poll to your list.'));
        },
        err => {
          this.props.dispatch(snackbarActions.open(`Error: ${err}`))
          console.log('error', err);
        }
      );
  }

  deleteFavorite() {
    pollService.deleteFavorite(this.props.authentication.user.current_user.id, this.props.question.id)
      .then(
        res => {
          let question = this.state.question;
          question.favorite = 0;
          this.setState({question});
          this.props.dispatch(snackbarActions.open('You have successfully removed a poll from your list.'));
        },
        err => {
          this.props.dispatch(snackbarActions.open(`Error: ${err}`));
          console.log('Error', err);
        }
      )
  }

  render() {
    const { classes, question, authentication } = this.props;

    return(
      <div className={classes.demo}>
        <List dense={false}>
          <ListItem>
            <ListItemText
              primary={
                <span>
                  <Link to={`/question/${question.id}`}>{question.question}</Link>
                </span>
              }
              secondary={
                <span>
                  <span>Created by: <Link to={`/profile/${question.created_by}`}>{question.created_by}</Link> - </span>
                  <span>{question.responses} response{question.responses !== 1 ? 's' : ''} - </span>
                  <span>{question.question_count} questions</span>
                </span>
              }
            />
            <div>
              {/* <Button dense={true} color="primary">
                Share
              </Button> */}
              { authentication.loggedIn &&
                <Button dense={true} color="primary" onClick={this.toggleFavorite}>
                  <Icon className={classes.leftIcon}>{question.favorite ? 'check': 'add'}</Icon>
                  My List
                </Button>
              }
              <Button dense={true} component={Link} to={`/question/${question.id}`}>
                View
              </Button>
            </div>
          </ListItem>
        </List>
      </div>
    )
  }
}

Poll.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { authentication } = state;
  return { authentication };
}

export default compose(withStyles(styles), connect(mapStateToProps))(Poll);