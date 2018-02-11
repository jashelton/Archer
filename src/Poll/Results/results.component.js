import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { resultsService } from '../../services';
import { PlotlyPieChart } from '../../components/PlotlyPieChart.js';
import Filters from '../../components/Filters.js';

import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  }
});

class ResultsComponent extends React.Component {
  constructor(props) {
    super(props);

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
        result => { this.setState({ results: result.data })},
        error => console.log('error', error) // If the poll doesn't exist, should redirect to 404
      );
  }

  render() {
    const { classes } = this.props;
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
          <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <span>Number of responses: {this.state.results.responses}</span>
              </Grid>
              {results.questions.map(q => (
                <Grid key={q.id} item xs={12} sm={6}>
                  <PlotlyPieChart
                    question={q}
                    poll_id={this.state.poll_id}
                    updateQuestion={this.update}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        }
      </div>
    )
  }
}

ResultsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { authentication, filters } = state;
  return { authentication, filters };
}

export default compose(withStyles(styles), connect(mapStateToProps))(ResultsComponent);