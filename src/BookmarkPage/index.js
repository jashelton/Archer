import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bookmarkService } from '../services';

class BookmarkPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null
    }

    bookmarkService.list(this.props.authentication.user.current_user.id)
      .then(
        res => this.setState({questions: res.data}),
        err => console.log('error', err) 
      );
  }

  render() {
    const { questions } = this.state;

    return(
      <div>
        <h2>Bookmarked Polls:</h2>
        {questions &&
          <ul>
            {questions.map(q => (
              <li key={q.poll_id}><Link to={`/question/${q.poll_id}`}>{q.question}</Link></li>
            ))}
          </ul>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  return { authentication };
}

const connectedBookmarkPage = connect(mapStateToProps)(BookmarkPage);
export { connectedBookmarkPage as BookmarkPage };