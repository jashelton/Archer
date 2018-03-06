import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { commentsService } from '../../services';
import Comments from '../../components/Comments.js';

// Material
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary } from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: '25%',
    flexShrink: 0,
  },
});

class ThreadComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      threads: null,
      expanded: null
    }

    commentsService.threads_by_poll(props.poll_id)
      .then(
        res => this.setState({threads: res.data}),
        err => console.log('error', err) 
      );
  }

  handleChange = (panel, thread_id) => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });

    this.getComments(thread_id);
  };

  getComments(thread_id) {
    commentsService.comments_by_thread(thread_id)
      .then(
        res => {
          const selectedThreadIndex = this.state.threads.findIndex(thread => thread.id === thread_id);
          const currentThreads = this.state.threads;

          currentThreads[selectedThreadIndex].comments = res.data;
          this.setState({threads: currentThreads});
        },
        err => console.log(err)
      );
  }

  render() {
    const { threads, expanded } = this.state;
    const { classes } = this.props;

    return(
      <div className={classes.root}>
        { threads &&
          <div>
            {threads.map((thread, index) => (
              <ExpansionPanel key={index} expanded={expanded === `panel${index}`} onChange={this.handleChange(`panel${index}`, thread.id)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Avatar className={classes.avatar}>
                    {thread.num_comments}
                  </Avatar>
                  <Typography className={classes.secondaryHeading}>{thread.created_at} - {thread.username} - {thread.num_comments}</Typography>
                  <Typography className={classes.heading}>{thread.text}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div className={classes.root}>
                    {thread.comments && <Comments comments={thread.comments} />}
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </div>
        }
      </div>
    )
  }
}

ThreadComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ThreadComponent);