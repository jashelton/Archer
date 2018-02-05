import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    width: '100%',
    marginBottom: '25px'
  },
  flex: {
    flex: 1,
  },
};

class Question extends React.Component {
  render() {
    const { classes } = this.props;

    return(
      <div>
        <Card className={classes.card}>
          <CardHeader>
            Header
          </CardHeader>
          <CardContent>
            <Typography type="headline" component="h2">
              Content
            </Typography>
          </CardContent>
          <CardActions>
            <span className={classes.flex}></span>
            <Button dense raised={true} color="primary">
              Add Answer
            </Button>
          </CardActions>
        </Card>
        <Card className={classes.card}>
          <CardActions>
            <Button dense raised={true} color="primary" className={classes.flex}>
              Add Question
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

Question.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { authentication } = state;
  return {
    authentication
  };
}

const connectedQuestionLayout = connect(mapStateToProps)(Question);
export default withStyles(styles)(connectedQuestionLayout);
