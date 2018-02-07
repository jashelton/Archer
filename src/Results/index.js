import React from 'react';
import { resultsService } from '../services';
import { PlotlyPieChart } from '../components/PlotlyPieChart.js';
import Filters from '../components/Filters.js';

export class ResultsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      filters: []
    };

    this.addFilter = this.addFilter.bind(this);
  }

  componentWillMount() {
    const poll_id = this.props.match.params.id;
    resultsService.getById(poll_id)
      .then(
        result => { this.setState( {results: result.data })},
        error => console.log('error', error) // If the poll doesn't exist, should redirect to 404
      )
  }

  addFilter(filter) {
    let filters = this.state.filters;

    filters.push({key: filters.length, label: filter});
    this.setState({filters});
  }

  render() {
    const { results, filters } = this.state;

    return(
      <div>
        <Filters filters={filters} /> 
        {
          results &&
          <div>
            <span>Number of responses: {this.state.results.responses}</span>
            {results.questions.map(q => (
              <PlotlyPieChart key={q.id} question={q} addFilter={this.addFilter} />
            ))}
          </div>
        }
      </div>
    )
  }
}