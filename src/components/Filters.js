import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class Filters extends React.Component {
  state = {
    chipData: this.props.filters
  };

  handleDelete = data => () => {
    const chipData = [...this.state.chipData];
    const chipToDelete = chipData.indexOf(data);

    chipData.splice(chipToDelete, 1);
    this.setState({ chipData });
  };

  render() {
    const { classes, filters } = this.props;

    if (filters.length > 0) {
      return  <Paper className={classes.root}>
                {this.state.chipData.map(data => {
                  return (
                    <Chip
                      key={data.key}
                      label={data.label}
                      onDelete={this.handleDelete(data)}
                      className={classes.chip}
                    />
                  );
                })}
              </Paper>
    } else {
      return <Paper className={classes.root}> No filters selected. </Paper>
    }
  }
}

Filters.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Filters);