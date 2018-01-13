import React from 'react';
import { connect } from 'react-redux'; // LEARN: Look into connect
import { questionActions } from '../actions';

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
            <h1>{question.items.primary_question.question}</h1>
            {question.items.primary_question.answers.map(a => (
              <span key={a.id}>{a.answer}</span>
            ))}
            {/* Create a question component.  Map over and render it with the answers */}
            <ul>
              {question.items.secondary_questions.map(q => (
                <li key={q.id}>{q.question}</li>
              ))}
            </ul>
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