import React from 'react';
import { connect } from 'react-redux'; // LEARN: Look into connect
import { Link } from 'react-router-dom';
import { questionActions } from '../actions';

export default class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(questionActions.getAll());
  }
  render() {
    const { questions } = this.props;
    console.log(this.props);
    console.log(questions);
    console.log(typeof(questions))
    // const testing = questions.questions.map(q => q.text);
    // console.log(questions.data.questions);
    // console.log(questions.data['questions']);
    return (
      <div className="home-view container">
        <Link to="/login">Logout</Link>
        hello
        {questions.items &&
          <ul>
            {questions.items.map((q, i) => (
              <li key={i}>{q.text}</li>
            ))}
          </ul>
        }
      </div>
    );
  }
}

// {this.props.data.locations.map((location, index) => (
//   <Location key={index} name={location.name} image={images[index]} />
// ))}

// LEARN: need to dig into this function -> should help once digging into state
function mapStateToProps(state) {
  console.log(state);
  const { questions } = state;
  return {
    questions
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage); // LEARN: unclear
export { connectedHomePage as HomePage }; // LEARN: why?
