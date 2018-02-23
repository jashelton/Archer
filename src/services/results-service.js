import { SecureHeaders } from '../helpers';

export const resultsService = {
  getById,
  updateFilters
};

function getById(id, user_id) {
  const requestOptions = SecureHeaders.requestOptions('GET');
  return fetch(`http://localhost:8080/results/${id}`, requestOptions).then(handleResponse);
}

function updateFilters(data) {
  const requestOptions = SecureHeaders.requestOptions('GET');
  
  return fetch(`http://localhost:8080/test?params=${JSON.stringify(data)}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText);
  }

  return response.json();
}
