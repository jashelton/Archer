import React from 'react';
import PropTypes from 'prop-types';

// Material
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  comment: {
    marginLeft: '15px'
  },
  card: {
    width: '100%',
    marginBottom: '5px',
    marginTop: '5px'
  },
});

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: props.comments
    }
  }

  render() {
    const { comments, classes } = this.props;

    return(
      <div>
        { comments &&
          <div>
            {comments.map(c => (
              <Card key={c.id} className={classes.card}>
                <CardContent>
                  <div className={classes.comment}>
                    <div>{c.text}</div>
                    <div>Created by: {c.username}</div>
                    <div>Created at: {c.created_at}</div>
                    {c.comments && c.comments.length && 
                      <div><Comments classes={classes} comments={c.comments} /></div>
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

export default withStyles(styles)(Comments);
