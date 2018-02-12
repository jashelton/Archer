import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { pollService } from '../services';

import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';

const styles = {
  card: {
    width: '100%',
    marginBottom: '5px'
  },
};

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
        },
        err => console.log('error', err)
      );
  }

  deleteFavorite() {
    pollService.deleteFavorite(this.props.authentication.user.current_user.id, this.props.question.id)
      .then(
        res => {
          let question = this.state.question;
          question.favorite = 0;
          this.setState({question});
        }
      )
  }

  render() {
    const { classes, question, authentication } = this.props;

    return(
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2">
            {question.question}
          </Typography>
          <Typography component="p">
            Created by: 
            <Link to={`/profile/${question.created_by}`}> {question.created_by} </Link>
            on {question.created_at}
          </Typography>
          <Typography component="p">
            <span>{question.responses} response{question.responses !== 1 ? 's' : ''}</span>
            <span>X total questions</span>
            <span>upvotes/downvotes</span>
            <span>Tag</span>
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button dense color="primary">
            Share
          </Button> */}
          {
            authentication.loggedIn &&
            <Button dense color="primary" onClick={this.toggleFavorite}>
              <Icon className={classes.leftIcon}>{question.favorite ? 'check': 'add'}</Icon>
              My List
            </Button>
          }
          <Button component={Link} to={`/question/${question.id}`}>
            View
          </Button>
        </CardActions>
      </Card>
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