import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { questionActions, snackbarActions } from '../../actions';
import { pollService } from '../../services';
import { history } from '../../helpers/index';

// Material
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

const styles = theme => ({
  card: {
    width: '100%',
    marginBottom: '24px'
  },
  flex: {
    flex: 1,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class VoteComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestion: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goNext = this.goNext.bind(this);

    const question_id = this.props.match.params.id;
    // TODO: This is currently stored in the store as 'question' but should be a 'poll'.
    this.props.dispatch(questionActions.getById(question_id, this.props.authentication.user.current_user.id));
  }

  handleChange(event, value) {
    const name = event.target.name;
    let obj = {};

    obj[name] = value;
    this.setState(obj);

    if (this.state.currentQuestion < this.props.question.items.questions.length - 1) {
      this.goNext()
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = this.state;
    delete form.currentQuestion;

    const data = {
      username: this.props.authentication.user.current_user.id,
      poll_id: this.props.question.items.poll_id,
      form
    }

    pollService.submit(data).then(
      () => {
        history.replace(`/results/${data.poll_id}`);
        this.props.dispatch(snackbarActions.open('You have successfully voted on the poll.'));
      },
      err => {
        this.props.dispatch(snackbarActions.open(`Error: ${err}`))
        console.log('error', err);
      }
    );
  }

  goBack() {
    this.setState({currentQuestion: this.state.currentQuestion - 1});
  }

  goNext() {
    this.setState({currentQuestion: this.state.currentQuestion + 1})
  }

  render() {
    // TODO: These are actually polls, not question.
    const { question, classes } = this.props;

    return(
      <div>
        {/* TODO: Refactor Lana to return all questions ordered by type rather than separating primary and secondary questions */}
        {question.items && !question.items.has_taken &&
          <form onSubmit={this.handleSubmit}>
            {question.items.questions.map((q, i) => (
              <div key={q.question_id}>
                {i === this.state.currentQuestion &&
                  <Card className={classes.card}>
                    <CardHeader
                      title={<span>{i + 1} / {question.items.questions.length}</span>}
                    />
                    <CardContent>
                      <FormControl component="fieldset" required className={classes.formControl}>
                        <FormLabel component="legend">{q.question}</FormLabel>
                        <RadioGroup
                          aria-label="gender"
                          name={q.question_id.toString()}
                          className={classes.group}
                          value={this.state[q.question_id]}
                          onChange={this.handleChange}
                        >
                          {q.answers.map((a, j) => (
                            <FormControlLabel
                              key={a.id}
                              value={a.value}
                              control={<Radio />}
                              label={a.answer}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </CardContent>
                    <CardActions>
                      { this.state.currentQuestion > 0 &&
                        <Button dense raised={true} color="primary" onClick={this.goBack}>
                          Back
                        </Button>
                      }
                      <span className={classes.flex}></span>
                      { this.state.currentQuestion < question.items.questions.length - 1 &&
                        <Button dense raised={true} color="primary" onClick={this.goNext} disabled={!this.state[q.question_id]}>
                          Next
                        </Button>
                      }
                      {
                        this.state.currentQuestion + 1 === question.items.questions.length &&
                        <Button dense raised={true} color="primary" onClick={this.handleSubmit}>
                          Submit
                        </Button>
                      }
                    </CardActions>
                  </Card>
                } 
              </div>
            ))}
          </form>
        }
      </div>
    )
  }
}

VoteComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { question, authentication } = state;

  return {
    question, authentication
  };
}

const connectedVoteComponent = connect(mapStateToProps)(VoteComponent);
export default withStyles(styles)(connectedVoteComponent);