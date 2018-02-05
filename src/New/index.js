import React from 'react';
import { connect } from 'react-redux'; // LEARN: Look into connect
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Question from '../components/Question.js';
import { NewQuestion } from '../models/question.model.js';
import Button from 'material-ui/Button';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class CreatePage extends React.Component {
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

  handleSubmit() {
    let newPoll = {
      author: this.state.auth.user.current_user.id,
      questions: this.state.form
    };
    
    console.log(newPoll);
  }

  render() {
    const { form } = this.state;

    return(
      <div>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          {form.map((question, index) => (
            <Question key={index} index={index} question={question} form={form} />
          ))}
          <Button type="button" dense raised={true} color="primary" onClick={this.handleAddQuestion}>
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

CreatePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

// LEARN: need to dig into this function -> should help once digging into state
function mapStateToProps(state) {
  const { authentication } = state;

  return {
    authentication
  };
}

const connectedCreatePage = connect(mapStateToProps)(CreatePage); // LEARN: unclear
export default withStyles(styles)(connectedCreatePage);
