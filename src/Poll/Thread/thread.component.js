import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { commentsService } from '../../services';
import Comments from '../../components/Comments.js';
import { snackbarActions } from '../../actions';

// Material
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary } from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Add from 'material-ui-icons/Add';
import TextField from 'material-ui/TextField';
import Card, { CardActions, CardContent } from 'material-ui/Card';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  actionsContainer: {
    justifyContent: 'space-between',
    display: 'flex'
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
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  flex: {
    flex: 1
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
});

class ThreadComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      poll_id: this.props.poll_id,
      threads: null,
      expanded: null,
      creatingThread: false,
      newThreadValue: ''
    }

    commentsService.threads_by_poll(props.poll_id)
      .then(
        res => this.setState({threads: res.data}),
        err => console.log('error', err) 
      );

    this.toggleCreatingThread = this.toggleCreatingThread.bind(this);
    this.submitThread = this.submitThread.bind(this);
  }

  handleChange = (panel, thread_id) => (event, expanded) => {
    console.log(expanded);
    this.setState({
      expanded: expanded ? panel : false
    });

    if (expanded) {
      this.getComments(thread_id);
    }
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

  toggleCreatingThread() {
    const creatingThread = !this.state.creatingThread;
    this.setState({creatingThread});
  }

  handleThreadChange(e) {
    this.setState({newThreadValue: e.target.value});
  }

  submitThread() {
    const threadData = {
      poll_id: this.props.poll_id,
      text: this.state.newThreadValue,
      user_id: this.props.user_id
    }

    commentsService.newThread(threadData)
      .then(
        res => {
          const { threads } = this.state;
          threads.push(res.data.thread);

          this.setState({threads});
          this.props.dispatch(snackbarActions.open(`${res.data.message}`));
        },
        err => this.props.dispatch(snackbarActions.open(`${err}`))
      );
  }

  render() {
    const { threads, expanded, creatingThread, newThreadValue } = this.state;
    const { classes } = this.props;

    return(
      <div className={classes.root}>
        <div className={classes.actionsContainer}>
          <span className={classes.flex}></span>
          <Button className={classes.button} variant="raised" size="small" onClick={this.toggleCreatingThread}>
            <Add className={classes.leftIcon} />
            New Thread
          </Button>
        </div>
        { creatingThread &&
          <Card>
            <form>
              <CardContent>
              <TextField
                id="textarea"
                label="With placeholder multiline"
                placeholder="Placeholder"
                multiline
                className={classes.textField}
                margin="normal"
                value={newThreadValue}
                onChange={(e) => this.handleThreadChange(e)}
              />
              </CardContent>
              <CardActions>
                <Button className={classes.button} color="primary" dense={true} variant="raised" size="small" onClick={this.submitThread}>
                  Save
                </Button>
                <Button className={classes.button} color="primary" dense={true} variant="raised" size="small" onClick={this.toggleCreatingThread}>
                  Cancel
                </Button>
              </CardActions>
            </form>
          </Card>
        }
        { threads &&
          <div>
            {threads.map((thread, index) => (
              <ExpansionPanel key={index} expanded={expanded === `panel${index}`} onChange={this.handleChange(`panel${index}`, thread.id)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Avatar className={classes.avatar}>
                    {thread.num_comments || '0'}
                  </Avatar>
                  <Typography className={classes.secondaryHeading}>{thread.created_at} - {thread.username} - {thread.num_comments}</Typography>
                  <Typography className={classes.heading}>{thread.text}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div className={classes.root}>
                    {thread.comments && <Comments comments={thread.comments} />}
                    {!thread.num_comments && <span>There are currently no comments for this thread.</span>}
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

function mapStateToProps(state) {
  const { authentication } = state;

  return { user_id: authentication.user.current_user.id };
}

export default compose(withStyles(styles), connect(mapStateToProps))(ThreadComponent);
