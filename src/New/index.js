import React from 'react';
import { connect } from 'react-redux'; // LEARN: Look into connect

class CreatePage extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      auth: this.props.authentication
    }

    console.log(this.state);
  }

  render() {
    return(
      <div>
        New Poll
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
