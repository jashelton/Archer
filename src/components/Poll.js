import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    width: '100%',
  },
};

class Poll extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props);
  }

  render() {
    const { classes, question } = this.props;

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
            {question.responses} response{question.responses > 1 ? 's' : ''}
          </Typography>
          <Typography component="p">
            Number of follow up questions
          </Typography>
          <Typography component="p">
            upvotes/downvotes
          </Typography>
          <Typography component="p">
            Tags associated with poll
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense color="primary">
            Share
          </Button>
          <Button dense color="primary">
            + My List
          </Button>
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

export default withStyles(styles)(Poll);