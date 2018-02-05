import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  card: {
    width: '100%',
    marginBottom: '25px'
  },
  flex: {
    flex: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    // width: 200,
    width: '50%'
  },
  menu: {
    width: 200,
  },
});

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: props.question.answers,
      question: props.question
    }

    this.handleAddAnswer = this.handleAddAnswer.bind(this);
  }

  handleAddAnswer() {
    let answers = this.state.answers;
    answers.push({name: ''});

    this.setState({ answers });
  }

  handleAnswerChange = ind => event => {
    const answers = this.state.answers;
    answers[ind].name = event.target.value;

    this.setState({ answers });
  };

  handleQuestionChange = index => event => {
    const question = this.state.question;
    question.name = event.target.value;

    this.setState({ question });
  }

  render() {
    const { classes, index, question } = this.props;

    return(
      <div>
        <Card className={classes.card}>
          <CardHeader
            title={index === 0 ? 'Primary Question' : 'Secondary Question'}
            subheader='subheader'
          />
          <CardContent>
            <TextField
              id="question"
              label="Question"
              className={classes.textField}
              value={question.name}
              onChange={this.handleQuestionChange(index)}
              margin="normal"
            />
            <Typography type="headline" component="h2">
              {question.answers.map((answer, i) => (
                <TextField
                  key={i}
                  id="name"
                  label="Answer Option"
                  className={classes.textField}
                  value={answer.name}
                  onChange={this.handleAnswerChange(i)}
                  margin="normal"
                />
              ))}
            </Typography>
          </CardContent>
          <CardActions>
            <span className={classes.flex}></span>
            <Button dense raised={true} color="primary" onClick={this.handleAddAnswer}>
              Add Answer
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
