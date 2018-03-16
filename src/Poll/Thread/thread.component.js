import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { commentsService, rankingService } from '../../services';
import Comments from '../../components/Comments.js';
import { snackbarActions } from '../../actions';
import Ranking from '../../components/Ranking';

// Material
import Button from 'material-ui/Button';
import Add from 'material-ui-icons/Add';
import TextField from 'material-ui/TextField';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

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
    flexBasis: '10%',
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
    width: '50%',
  },
  threadDescription: {
    padding: '25px',
    backgroundColor: 'rgba(55, 72, 172, 0.2)'
  },
  commentsContainer: {
    flexGrow: 1,
    padding: '25px'
  }
});

class ThreadComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      poll_id: this.props.poll_id,
      threads: null,
      expanded: null,
      creatingThread: false,
      creatingComment: false,
      commentText: '',
      form: {
        threadTitle: '',
        threadDescription: ''
      }
    }

    commentsService.threads_by_poll(props.poll_id)
      .then(
        res => this.setState({threads: res.data}),
        err => console.log('error', err) 
      );

    this.toggleCreatingThread = this.toggleCreatingThread.bind(this);
    this.toggleCreatingComment = this.toggleCreatingComment.bind(this);
    this.submitThread = this.submitThread.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  handleChange = (thread_id) => () => {
    this.setState({expanded: thread_id === this.state.expanded ? null : thread_id});
    if (this.state.expanded > -1) {
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
        err => this.props.dispatch(snackbarActions.open(`${err}`))
      );
  }

  toggleCreatingThread() {
    const creatingThread = !this.state.creatingThread;
    this.setState({creatingThread});
  }

  toggleCreatingComment() {
    const creatingComment = !this.state.creatingComment;
    this.setState({creatingComment});
  }

  handleThreadChange(e) {
    const { form } = this.state;
    const { name, value } = e.target;

    form[name] = value;
    this.setState({ form });
  }

  handleCommentChange(e) {
    this.setState({commentText: e.target.value});
  }

  submitThread() {
    const { form } = this.state;
    const threadData = {
      poll_id: this.props.poll_id,
      title: form.threadTitle,
      desc: form.threadDescription,
      user_id: this.props.user_id
    }

    commentsService.newThread(threadData)
      .then(
        res => {
          const { threads } = this.state;
          threads.push(res.data.thread);

          this.setState({threads, form: {}, creatingThread: false});
          this.props.dispatch(snackbarActions.open(`${res.data.message}`));
        },
        err => this.props.dispatch(snackbarActions.open(`${err}`))
      );
  }

  submitComment = (thread_id) => () => {
    const commentData = {
      thread_id,
      parent_id: null,
      user_id: this.props.user_id,
      text: this.state.commentText
    };

    commentsService.create(commentData)
      .then(
        res => {
          this.getComments(thread_id);
          this.setState({commentText: '', creatingComment: false});
          this.props.dispatch(snackbarActions.open(`${res.data.message}`));
        },
        err => this.props.dispatch(snackbarActions.open(`${err}`))
      );
  }

  updateRanking = (thread_index) => (value) => {
    const targetThread = this.state.threads[thread_index];
    const { id, user_rank } = targetThread;
    const rankData = {
      thread_id: id,
      user_id: this.props.user_id,
      user_rank,
      value
    };

    rankingService.createOrUpdateThreadRanking(rankData)
      .then(
        res => {
          let { threads } = this.state;
          threads[thread_index].total_rank = res.data.data.total_rank;
          threads[thread_index].user_rank = value;
          this.setState({threads});
          this.props.dispatch(snackbarActions.open(res.data.message));
        },
        err => this.props.dispatch(snackbarActions.open(`Error: ${err}`))
      );
  }

  render() {
    const { threads,
            expanded,
            creatingThread,
            creatingComment,
            commentText,
            form } = this.state;
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
                  name="threadTitle"
                  label="Thread Title"
                  placeholder="Title"
                  className={classes.textField}
                  margin="normal"
                  value={form.threadTitle}
                  onChange={(e) => this.handleThreadChange(e)}
                />
                <TextField
                  id="textarea"
                  name="threadDescription"
                  label="Thread Description"
                  placeholder="Description"
                  multiline
                  className={classes.textField}
                  margin="normal"
                  value={this.state.form.threadDescription}
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
            { threads.length > 0 &&
              <div>
                {threads.map((thread, index) => (
                  <div key={index}>
                    <List dense={true}>
                      <ListItem>
                        <div className={classes.ranking}>
                          <Ranking selected_rank={thread.user_rank} rank={thread.total_rank} onChange={this.updateRanking(index)} />
                        </div>

                        <ListItemText onClick={this.handleChange(thread.id)}
                          primary={thread.title}
                          secondary={
                            `Created on: ${new Date(thread.created_at).toDateString()}
                            By: ${thread.username}
                            - ${thread.num_comments} comment${thread.num_comments !== 1 ? 's' : ''}`
                          }
                        />
                      </ListItem>
                    </List>
                    { expanded === thread.id &&
                      <div className={classes.commentsContainer}>
                        <div className={classes.threadDescription}>{thread.description}</div>
                        <div className={classes.actionsContainer}>
                          <span className={classes.flex}></span>
                          <Button className={classes.button} variant="raised" size="small" onClick={this.toggleCreatingComment}>
                            <Add className={classes.leftIcon} />
                            New Comment
                          </Button>
                        </div>
                        { creatingComment &&
                          <Card>
                            <form>
                              <CardContent>
                                <TextField
                                  id="textarea"
                                  name="commentText"
                                  label="Comment"
                                  placeholder="Comment"
                                  multiline
                                  className={classes.textField}
                                  margin="normal"
                                  value={commentText}
                                  onChange={(e) => this.handleCommentChange(e)}
                                />
                              </CardContent>
                              <CardActions>
                                <Button className={classes.button} color="primary" dense={true} variant="raised" size="small" onClick={this.submitComment(thread.id)}>
                                  Save
                                </Button>
                                <Button className={classes.button} color="primary" dense={true} variant="raised" size="small" onClick={this.toggleCreatingComment}>
                                  Cancel
                                </Button>
                              </CardActions>
                            </form>
                          </Card>
                        }
                        { thread.comments &&
                          <Comments comments={thread.comments} />
                        }
                        { thread.comments && !thread.comments.length &&
                          <span>There are currently no comments for this thread.</span>
                        }
                      </div>
                    }
                      <Divider inset component="div" />
                    </div>
                ))}
              </div>
            }
            {!threads.length > 0 &&
              <div>
                <span>There are currently no threads for this poll.</span>
              </div>
            }
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
