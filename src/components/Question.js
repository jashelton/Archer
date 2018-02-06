import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
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
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            title={index === 0 ? 'Primary Question' : 'Secondary Question'}
            subheader='subheader'/>
          <CardContent>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  id="question"
                  label="Question"
                  className={classes.textField}
                  value={question.name}
                  onChange={this.handleQuestionChange(index)}
                  margin="normal"/>
              </Grid>
              {question.answers.map((answer, i) => (
                <Grid item xs={12} sm={6}>
                  <TextField
                    key={i}
                    id="name"
                    label="Answer Option"
                    className={classes.textField}
                    value={answer.name}
                    onChange={this.handleAnswerChange(i)}
                    margin="normal"/>
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
