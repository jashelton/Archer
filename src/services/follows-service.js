import { SecureHeaders } from '../helpers';

export const followsService = {
  follow,
  unfollow
};

function follow(user_to_follow, current_user) {
  const requestOptions = SecureHeaders.requestOptions('POST', { current_user });

  return fetch(`${process.env.REACT_APP_BASEURL}/follows/${user_to_follow}`, requestOptions).then(handleResponse);
}

function unfollow(user_to_unfollow, current_user) {
  const requestOptions = SecureHeaders.requestOptions('DELETE', { current_user });

  return fetch(`${process.env.REACT_APP_BASEURL}/follows/${user_to_unfollow}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText);
  }

  return response.json();
}

