import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { filterActions } from '../actions';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class Filters extends React.Component {
  componentWillMount() {
    this.props.dispatch(filterActions.getFilters());
  }

  handleDelete (data) {
    this.props.dispatch(filterActions.deleteFilter(data));
    setTimeout(() => {
      // TODO: Should handle this on the backend instead.  Use same method?
      if (this.props.filters.length) {
        this.props.updateQuestion();
      } else {
        this.props.getPoll();
      }
      
  }, 15); 
    // this.props.updateQuestion();
  };

  render() {
    const { classes, filters } = this.props;

    if (filters.length > 0) {
      return  <Paper className={classes.root}>
                {filters.map((data, index)=> {
                  return (
                    <Chip
                      key={index}
                      label={data}
                      onDelete={() => this.handleDelete(data)}
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

function mapStateToProps(state) {
  const { filters, authentication } = state;
  return { filters, authentication };
}

export default compose(withStyles(styles), connect(mapStateToProps))(Filters);
