import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  card: {
    width: '100%',
    marginBottom: '24px'
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
    flex: 1,
    width: '100%'
  },
  menu: {
    width: 200,
  },
  wrapper: {
    display: 'flex',
    flex: 1
  }
});

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: props.question.answers,
      question: props.question
    }

    this.handleAddAnswer = this.handleAddAnswer.bind(this);
    this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
    this.handleDeleteAnswer = this.handleDeleteAnswer.bind(this);
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

  handleDeleteQuestion() {
    this.props.deleteQuestion(this.props.index);
  }

  handleDeleteAnswer = answerIndex => event => {
    const currentQuestion = this.state.question;
    currentQuestion.answers.splice(answerIndex, 1);
    this.setState({question: currentQuestion});
  }

  render() {
    const { classes, index, question } = this.props;

    return(
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            title={index === 0 ? 'Primary Question' : 'Secondary Question'}
            subheader='subheader'
            action={index > 1 &&
              <IconButton onClick={this.handleDeleteQuestion}>
                delete
              </IconButton>
            }
          />
          <CardContent>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  required = {index < 2 ? true : false}
                  id="question"
                  label="Question"
                  className={classes.textField}
                  value={question.name}
                  onChange={this.handleQuestionChange(index)}
                  margin="normal"/>
              </Grid>
              {question.answers.map((answer, i) => (
                <Grid key={i} item xs={12} sm={6}>
                  <TextField
                    required = { i < 2 ? true : false}
                    id="name"
                    label="Answer Option"
                    className={classes.textField}
                    value={answer.name}
                    onChange={this.handleAnswerChange(i)}
                    margin="normal"/>
                  { i > 1 &&
                    <Button dense raised={true} color="primary" onClick={this.handleDeleteAnswer(i)}>
                      Delete Answer
                    </Button>
                  }
                </Grid>

              ))}
            </Grid>
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
