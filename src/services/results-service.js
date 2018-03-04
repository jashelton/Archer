import { SecureHeaders } from '../helpers';

export const resultsService = {
  getById,
  updateFilters
};

function getById(id, user_id) {
  const requestOptions = SecureHeaders.requestOptions('GET');
  return fetch(`${process.env.REACT_APP_BASEURL}/results/${id}`, requestOptions).then(handleResponse);
}

function updateFilters(data) {
  const requestOptions = SecureHeaders.requestOptions('GET');
  
  return fetch(`${process.env.REACT_APP_BASEURL}/test?params=${JSON.stringify(data)}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText);
  }

  return response.json();
}
