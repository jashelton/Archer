import React from 'react';
import { connect } from 'react-redux'; // LEARN: Look into connect
import { questionActions } from '../actions';
import Poll from '../components/Poll.js';

export default class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(questionActions.getAll(this.props.authentication.user.current_user.id));
  }

  render() {
    // TODO: These are actually polls, not questions.
    const { questions } = this.props;

    return (
      <div className="home-view container">
        {questions.items &&
          <div>
            {questions.items.map(q => (
              <Poll key={q.id} question={q}/>
            ))}
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { questions, authentication } = state;
  return {
    questions, authentication
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
