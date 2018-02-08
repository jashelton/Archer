import React from 'react';
import { connect } from 'react-redux'; // LEARN: Look into connect
import { questionActions } from '../actions';
import { pollService } from '../services';
import { history } from '../helpers/index';

// TODO: This is a POLL rather than QUESTIONDETAIL

class QuestionDetailsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const question_id = this.props.match.params.id;
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
    const { question } = this.props;

    return(
      <div>
        {question.items && !question.items.has_taken &&
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
        }
      </div>
    )
  }
}

// LEARN: need to dig into this function -> should help once digging into state
function mapStateToProps(state) {
  const { question, authentication } = state;
  return {
    question, authentication
  };
}

const connectedQuestionDetailsPage = connect(mapStateToProps)(QuestionDetailsPage); // LEARN: unclear
export { connectedQuestionDetailsPage as QuestionDetailsPage }; // LEARN: why?