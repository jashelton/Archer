import React from 'react';
import { connect } from 'react-redux'; // LEARN: Look into connect

import Question from '../components/Question.js';
import { NewQuestion } from '../models/question.model.js';
import Button from 'material-ui/Button';

class CreatePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: this.props.authentication,
      form: []
    };

    this.handleAddQuestion = this.handleAddQuestion.bind(this);
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

  render() {
    const { form } = this.state;

    return(
      <div>
        {form.map((question, index) => (
          <Question key={index} index={index} question={question} form={form} />
        ))}
          <Button dense raised={true} color="primary" onClick={this.handleAddQuestion}>
            Add Question
          </Button>
      </div>
    )
  }
}

// LEARN: need to dig into this function -> should help once digging into state
function mapStateToProps(state) {
  const { authentication } = state;

  return {
    authentication
  };
}

const connectedCreatePage = connect(mapStateToProps)(CreatePage); // LEARN: unclear
export { connectedCreatePage as CreatePage }; // LEARN: why?
