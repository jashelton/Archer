import React from 'react';
import { connect } from 'react-redux';
import { resultsService } from '../../services';
import { PlotlyPieChart } from '../../components/PlotlyPieChart.js';
import Filters from '../../components/Filters.js';

class ResultsComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      results: null,
      poll_id: props.poll_id,
    };

    this.getPoll();
    this.getPoll = this.getPoll.bind(this);
    this.update = this.update.bind(this);
  }

  getPoll() {
    resultsService.getById(this.state.poll_id)
      .then(
        result => { this.setState({ results: result.data })},
        error => console.log('error', error) // If the poll doesn't exist, should redirect to 404
      )
  }

  update() {
    let data = {
      poll_id: this.state.poll_id,
      user_id: this.props.authentication.user.current_user.id,
      filters: this.props.filters
    };
    resultsService.updateFilters(data)
      .then(
        result => { console.log(result); this.setState({ results: result.data })},
        error => console.log('error', error) // If the poll doesn't exist, should redirect to 404
      );
  }

  render() {
    const { results } = this.state;

    return(
      <div>
        <Filters
          poll_id={this.state.poll_id}
          getPoll={this.getPoll}
          updateQuestion={this.update}
        /> 
        {
          results &&
          <div>
            <span>Number of responses: {this.state.results.responses}</span>
            {results.questions.map(q => (
              <PlotlyPieChart
                key={q.id}
                question={q}
                poll_id={this.state.poll_id}
                updateQuestion={this.update}
              />
            ))}
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { filters, authentication } = state;
  return { filters, authentication };
}

const connectedResultsComponent = connect(mapStateToProps)(ResultsComponent);
export { connectedResultsComponent as ResultsComponent };
