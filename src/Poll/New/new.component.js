import React from 'react';
import { connect } from 'react-redux'; // LEARN: Look into connect
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import Question from '../../components/Question.js';
import { NewQuestion } from '../../models/question.model.js';
import { pollService } from '../../services';
import { history } from '../../helpers/index';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class NewComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: this.props.authentication,
      form: []
    };

    this.handleAddQuestion = this.handleAddQuestion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const initialForm = [];
    for (let i = 0; i < 2; i++) {
      initialForm.push(new NewQuestion());
    }
    this.setState({form: initialForm});
  }

  handleAddQuestion() {
    this.setState({form: this.state.form.concat(new NewQuestion())});
  }

  validate(questions) {
    let fields = [];

    if (questions[0].name === '' ||
        questions[1].name === '' ||
        questions[0].answers[0].name === '' ||
        questions[0].answers[1].name === '' ||
        questions[1].answers[0].name === '' ||
        questions[1].answers[1].name === '' ) {
          return { error: 'You must submit a valid poll' };
        }
      questions.forEach((q, i) => {
      q.name === '' ? fields.push('invalid') : fields.push('valid')
      q.answers.forEach((a, j) => {
        if (a.name === '') {
          fields[i] = 'invalid';
        }
      });
    });

    const containsInvalid = fields.indexOf('invalid');

    if (containsInvalid > -1) {
      return {
        message: 'Valid poll with invalid fields',
        invalidFields: fields
      };
    };

    return {
      message: 'Valid poll',
      invalidFields: false
    };
  }

  handleSubmit() {
    let newPoll = {
      author: this.state.auth.user.current_user.id,
      questions: this.state.form
    };

    const formValidation = this.validate(newPoll.questions);

    if (formValidation.message === 'Valid poll' && !formValidation.invalidFields) {
      pollService.create(newPoll).then(
        (res) => history.replace(`/question/${res.data}`),
        error => console.log('error', error)
      );
    }
  }

  render() {
    const { form } = this.state;
    const { classes } = this.props;

    return(
      <div>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          {form.map((question, index) => (
            <Question key={index} index={index} question={question} form={form} />
          ))}
          <Button type="button" dense raised={true} color="primary" className={classes.flex} onClick={this.handleAddQuestion}>
            Add Question
          </Button>
          <Button dense raised={true} color="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
        </form>
      </div>
    )
  }
}

NewComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

// LEARN: need to dig into this function -> should help once digging into state
function mapStateToProps(state) {
  const { authentication } = state;

  return {
    authentication
  };
}

const connectedNewComponent = connect(mapStateToProps)(NewComponent); // LEARN: unclear
export default withStyles(styles)(connectedNewComponent);
