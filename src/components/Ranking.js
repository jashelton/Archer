import React from 'react';
import PropTypes from 'prop-types';

// Material
import { withStyles } from 'material-ui/styles';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
  ranking: {
    textAlign: 'center'
  },
  selected: {
    color: 'blue'
  },
  deselected: {
    color: 'inherit'
  }
});

class Ranking extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.setState({rank: nextProps.rank, selected_rank: nextProps.selected_rank});
  }

  updateRank = (value) => (e) => {
    const selected_rank = value === this.props.selected_rank ? 0 : value;
    this.props.onChange(selected_rank);
  }

  render() {
    const { classes, selected_rank, rank } = this.props;

    return(
      <div className={classes.ranking}>
        <div>
          <IconButton aria-label="Thumbs Up" onClick={this.updateRank(1)}>
            <Icon className={selected_rank === 1 ? classes.selected : classes.deselected}>thumb_up</Icon>
          </IconButton>
        </div>
        <div>{rank || 0}</div>
        <div>
          <IconButton aria-label="Thumbs Down" onClick={this.updateRank(-1)}>
            <Icon className={selected_rank === -1 ? classes.selected : classes.deselected}>thumb_down</Icon>
          </IconButton>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Ranking);