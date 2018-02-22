import { SecureHeaders } from '../helpers';

export const questionService = {
  getAll,
  getById
};

// Get list of polls
function getAll(user_id) {
  const requestOptions = SecureHeaders.requestOptions('GET');
  return fetch(`http://localhost:8080/questions?user_id=${user_id}`, requestOptions).then(handleResponse);
}

// Take Poll
function getById(id, user_id) {
  const requestOptions = SecureHeaders.requestOptions('GET');
  return fetch(`http://localhost:8080/questions/${id}?user_id=${user_id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText);
  }

  return response.json();
}
