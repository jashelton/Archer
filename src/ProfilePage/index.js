import React from 'react';
import { Link } from 'react-router-dom';
import { profileService } from '../services';

export class ProfilePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      data: null
    };

    // Could display /:username in the url, but pass user_id into the service to prevent the backend from having the get user.

  }

  componentWillMount() {
    const user = this.props.match.params.user;
    this.setState({user});

    profileService.created(user)
      .then(
        polls => { this.setState({data: polls.data}) },
        error => console.log('error', error) // If the user doesn't exist, should redirect to 404
      )
  }

  render() {
    const { data, user } = this.state;

    return(
      <div>
        {
          data &&
          <div>
            <h1>Polls created by {user}</h1>
            <ul>
              {data.created_polls.map(p => (
                <li key={p.poll_id}><Link to={`/question/${p.poll_id}`}>{p.question}</Link></li>
              ))}
            </ul>

            <div>
              <h2>Polls taken:</h2>
              <ul>
                {data.taken_polls.map(p => (
                  <li key={p.poll_id}><Link to={`/question/${p.poll_id}`}>{p.question}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        }
      </div>
    )
  }
}
