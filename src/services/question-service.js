import { SecureHeaders } from '../helpers';

export const questionService = {
  getAll,
  getById
};

// Get list of polls
function getAll(user_id) {
  // const requestOptions = SecureHeaders.requestOptions('GET');
  const requestOptions = {
    method: 'GET'
  }
  return fetch(`${process.env.REACT_APP_BASEURL}/questions?user_id=${user_id}`, requestOptions).then(handleResponse);
}

// Take Poll
function getById(id, user_id) {
  const requestOptions = SecureHeaders.requestOptions('GET');
  return fetch(`${process.env.REACT_APP_BASEURL}/questions/${id}?user_id=${user_id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText);
  }

  return response.json();
}
