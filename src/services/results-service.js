export const resultsService = {
  getById
};

function getById(id, user_id) {
  const requestOptions = {
    method: 'GET'
  };

  return fetch(`http://localhost:8080/results/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText);
  }

  return response.json();
}
