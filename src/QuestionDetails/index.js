import React from 'react';
import { connect } from 'react-redux'; // LEARN: Look into connect
import { questionActions } from '../actions';
import { Question } from '../components';

class QuestionDetailsPage extends React.Component {
  componentDidMount() {
    const question_id = this.props.match.params.id;
    this.props.dispatch(questionActions.getById(question_id));
  }

  render() {
    // TODO: These are actually polls, not question.
    const { question } = this.props;
    return(
      <div>
        {question.items &&
          <div>
            <Question question={question.items.primary_question} />
            <div>
              {question.items.secondary_questions.map(q => (
                <Question key={q.id} question={q} />
              ))}
            </div>
          </div>
        }
      </div>
    )
  }
}

// LEARN: need to dig into this function -> should help once digging into state
function mapStateToProps(state) {
  const { question } = state;
  return {
    question
  };
}

const connectedQuestionDetailsPage = connect(mapStateToProps)(QuestionDetailsPage); // LEARN: unclear
export { connectedQuestionDetailsPage as QuestionDetailsPage }; // LEARN: why?