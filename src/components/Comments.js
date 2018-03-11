import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import { commentsService } from '../services';
import { snackbarActions } from '../actions';

// Material
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ReplyIcon from 'material-ui-icons/Reply';

const styles = theme => ({
  comment: {
    marginLeft: '15px',
  },
  card: {
    width: '100%',
    marginBottom: '5px',
    marginTop: '5px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  commentDetails: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.text.secondary,
    marginBottom: '15px'
  },
  commentActions: {
    // fontSize: theme.typography.pxToRem(12),
    // color: theme.palette.text.secondary,
    // marginTop: '15px',
    // marginBottom: '15px'
  }
});

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // comments: null,
      isReplying: null,
      commentText: ''
    }

    this.cancelComment = this.cancelComment.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  reply = (comment_id) => (e) => {
    e.preventDefault();
    this.setState({isReplying: this.state.isReplying === comment_id ? null : comment_id});
  }

  cancelComment() {
    this.setState({isReplying: null});
  }

  handleCommentChange(e) {
    this.setState({commentText: e.target.value});
  }

  submitComment = (thread_id) => () => {
    const commentData = {
      thread_id,
      parent_id: this.state.isReplying,
      user_id: this.props.user_id,
      text: this.state.commentText
    };

    commentsService.create(commentData)
      .then(
        res => {
          const { isReplying } = this.state;
          const { comments } = this.props;
          const parentComment = comments.findIndex(c => c.id === isReplying);
          comments[parentComment].comments = comments[parentComment].comments ? comments[parentComment].comments.push(res.data.comment[0]) : res.data.comment;
          this.setState({isReplying: null, commentText: '', comments});
          this.props.dispatch(snackbarActions.open(`${res.data.message}`));
        },
        err => this.props.dispatch(snackbarActions.open(`Error: ${err}`))
      );
  }

  render() {
    const { classes, user_id, dispatch, comments } = this.props;
    const { isReplying, commentText } = this.state;

    return(
      <div>
        { comments && user_id &&
          <div>
            {comments.map(c => (
              <Card key={c.id} className={classes.card}>
                <CardContent>
                  <div className={classes.comment}>
                    <div className={classes.commentDetails}>
                      <Link to={`/profile/${c.username}`}>{c.username}</Link>
                      <span> - {`${new Date(c.created_at).toDateString()}`}</span>
                    </div>
                    <div>
                      <span>{c.text}</span>
                    </div>
                    <div className={classes.commentActions}>
                      {/* <a href="javascript:void(0)" onClick={this.reply(c.id)}>reply</a> */}
                      <IconButton color="secondary" className={classes.button} aria-label="Reply to comment." onClick={this.reply(c.id)}>
                        <ReplyIcon>alarm</ReplyIcon>
                      </IconButton>
                    </div>
                    {isReplying === c.id &&
                      <Card>
                        <form autoComplete="off">
                          <CardContent>
                            <TextField
                              id="textarea"
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
                            <Button dense={true} raised={true} color="primary" onClick={this.submitComment(c.thread_id)}>
                              Save
                            </Button>
                            <Button dense={true} raised={true} color="primary" onClick={this.cancelComment}>
                              Cancel
                            </Button>
                          </CardActions>
                        </form>
                      </Card>
                    }
                    {c.comments && c.comments.length && 
                      <Comments dispatch={dispatch} classes={classes} comments={c.comments} user_id={user_id} />
                    }
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        }
      </div>
    );
  }
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  const { authentication } = state;

  return { user_id: authentication.user.current_user.id };
}

export default compose(withStyles(styles), connect(mapStateToProps))(Comments);
