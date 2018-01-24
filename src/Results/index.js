import React from 'react';
import { resultsService } from '../services';

export class ResultsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null
    };
  }

  componentWillMount() {
    const poll_id = this.props.match.params.id;
    resultsService.getById(poll_id)
      .then(
        result => { this.setState( {results: result.data })},
        error => console.log('error', error) // If the poll doesn't exist, should redirect to 404
      )
  }

  render() {
    const { results } = this.state;
    console.log(results);
    return(
      <div>
        {
          results &&
          <div>
            Hello from results component.
            <span>Number of responses: {this.state.results.responses}</span>
          </div>
        }
      </div>
    )
  }
}