import React from 'react';
import { connect } from 'react-redux'; // LEARN: Look into connect

class QuestionDetailsPage extends React.Component {
  render() {
    return(
      <div>
        Hello
      </div>
    )
  }
}

// LEARN: need to dig into this function -> should help once digging into state
function mapStateToProps(state) {
  console.log(state);
  const { questionDetails } = state;
  return {
    questionDetails
  };
}

const connectedQuestionDetailsPage = connect(mapStateToProps)(QuestionDetailsPage); // LEARN: unclear
export { connectedQuestionDetailsPage as QuestionDetailsPage }; // LEARN: why?