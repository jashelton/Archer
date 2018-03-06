// Wrapper component that contains Results, Threads, and Preview

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

import ResultsComponent from '../Results/results.component';
import ThreadComponent from '../Thread/thread.component';
import { PreviewComponent } from '../';


const styles = theme => ({
  root: {
    flexGrow: 1
  },
});

class ViewComponent extends React.Component {
  state = {
    value: 0,
    poll_id: this.props.match.params.id,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value, poll_id } = this.state;

    return (
      <div>
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Results" />
            <Tab label="Thread" />
            <Tab label="Preview" />
          </Tabs>

          <div className={classes.root}>
            {value === 0 && <ResultsComponent poll_id={poll_id} />}
            {value === 1 && <ThreadComponent poll_id={poll_id} />}
            {value === 2 && <PreviewComponent />}
          </div>
        </Paper>
      </div>
    );
  }
}

ViewComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewComponent);