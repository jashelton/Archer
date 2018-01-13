import React from 'react';
import { connect } from 'react-redux'; // LEARN: Look into connect
import { Link } from 'react-router-dom';
import { questionActions } from '../actions';

export default class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(questionActions.getAll());
  }
  render() {
    // TODO: These are actually polls, not questions.
    const { questions } = this.props;
    return (
      <div className="home-view container">
        <Link to="/login">Logout</Link>
        {questions.items &&
          <ul>
            {questions.items.map(q => (
              <li key={q.id}><Link to={`/question/${q.id}`}>{q.question}</Link></li>
            ))}
          </ul>
        }
      </div>
    );
  }
}

// LEARN: need to dig into this function -> should help once digging into state
function mapStateToProps(state) {
  const { questions } = state;
  return {
    questions
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage); // LEARN: unclear
export { connectedHomePage as HomePage }; // LEARN: why?
