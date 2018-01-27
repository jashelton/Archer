import React from 'react';
import { connect } from 'react-redux'; // LEARN: Look into connect
import { questionActions } from '../actions';
import Poll from '../components/Poll.js';

export default class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(questionActions.getAll());
  }
  render() {
    // TODO: These are actually polls, not questions.
    const { questions } = this.props;

    return (
      <div className="home-view container">
        {/* <Link to="/register">Register</Link> */}
        {questions.items &&
          // <ul>
          <div>
            {questions.items.map(q => (
              <Poll key={q.id} question={q}/>
              // <li key={q.id}><Link to={`/question/${q.id}`}>{q.question}</Link></li>
            ))}
          </div>
          // </ul>
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
