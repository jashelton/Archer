import { SecureHeaders } from '../helpers';

export const profileService = {
  created
};

function created(user) {
  const requestOptions = SecureHeaders.requestOptions('GET');

  return fetch(`http://localhost:8080/polls/${user}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText);
  }

  return response.json();
}
