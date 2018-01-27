import React from 'react';
import { resultsService } from '../services';
import { PlotlyPieChart } from '../components';

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

  handleClick(e) {
    console.log(e);
    console.log('clicked');
  }

  handleSelected(e) {
    console.log(e);
    console.log('selected');
  }

  render() {
    const { results } = this.state;

    return(
      <div>
        {
          results &&
          <div>
            Hello from results component.
            <span>Number of responses: {this.state.results.responses}</span>
            {results.questions.map(q => (
              <PlotlyPieChart key={q.id} question={q} />
            ))}
          </div>
        }
      </div>
    )
  }
}