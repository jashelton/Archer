export const resultsService = {
  getById,
  updateFilters
};

function getById(id, user_id) {
  const requestOptions = {
    method: 'GET'
  };

  return fetch(`http://localhost:8080/results/${id}`, requestOptions).then(handleResponse);
}

function updateFilters(data) {
  const requestOptions = {
    method: 'GET'
  };

  const esc = encodeURIComponent;
  const query = Object.keys(data)
    .map(k => esc(k) + '=' + esc(data[k]))
    .join('&');
    
  console.log(query);

  return fetch(`http://localhost:8080/test?${query}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText);
  }

  return response.json();
}
