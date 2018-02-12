import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { questionActions } from '../../actions';
import { pollService } from '../../services';
import { history } from '../../helpers/index';

// Material
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

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

class VoteComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const question_id = this.props.match.params.id;
    // TODO: This is currently stored in the store as 'question' but should be a 'poll'.
    this.props.dispatch(questionActions.getById(question_id, this.props.authentication.user.current_user.id));
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    let obj = {};

    obj[name] = value;
    this.setState(obj);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: this.props.authentication.user.current_user.id,
      poll_id: this.props.question.items.poll_id,
      form: this.state,
    }
    pollService.submit(data).then(
      () => history.replace(`/results/${data.poll_id}`),
      error => console.log('error', error)
    );
  }

  render() {
    // TODO: These are actually polls, not question.
    const { question, classes } = this.props;

    return(
      <div>
        {/* TODO: Refactor Lana to return all questions ordered by type rather than separating primary and secondary questions */}
        {question.items && !question.items.has_taken &&
          <Card className={classes.card}>
            <form onSubmit={this.handleSubmit}>
              <div>
                <h1>{question.items.primary_question.question}</h1>
                {question.items.primary_question.answers.map(a => (
                  <div key={a.id}>
                    <label>{a.answer}</label>
                    <input type="radio" value={a.value} name={question.items.primary_question.question_id} onChange={this.handleChange}/>
                  </div>
                ))}
              </div>
              <div>
                {question.items.secondary_questions.map(sq => (
                  <div key={sq.question_id}>
                    <h2>{sq.question}</h2>
                    {sq.answers.map(a => (
                      <div key={a.id}>
                        <label>{a.answer}</label>
                        <input type="radio" value={a.value} name={sq.question_id} onChange={this.handleChange}/>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <input type="submit" value="Submit" />
            </form>
          </Card>
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