import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { pollService, rankingService } from '../services';
import Ranking from '../components/Ranking';

// Material
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
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
  ranking: {
    flexBasis: '5%',
  }
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
    this.handleChange = this.handleChange.bind(this);
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
        err => this.props.dispatch(snackbarActions.open(`Error: ${err}`))
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
        err => this.props.dispatch(snackbarActions.open(`Error: ${err}`))
      )
  }

  handleChange(value) {
    const { id, user_rank } = this.state.question;
    const rankData = {
      poll_id: id,
      user_id: this.props.authentication.user.current_user.id,
      user_rank,
      value
    };
    rankingService.createOrUpdatePollRanking(rankData)
      .then(
        res => {
          let { question } = this.state;
          question.total_rank = res.data.data.total_rank;
          question.user_rank = value;
          this.setState({question});
          this.props.dispatch(snackbarActions.open(res.data.message));
        },
        err => this.props.dispatch(snackbarActions.open(`Error: ${err}`))
      );
  }

  render() {
    const { classes, question, authentication } = this.props;
    
    return(
      <div className={classes.demo}>
        <List dense={false}>
          <ListItem>
            <div className={classes.ranking}>
              <Ranking selected_rank={question.user_rank} rank={question.total_rank} onChange={this.handleChange} />
            </div>
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