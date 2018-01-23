export const questionService = {
  getAll,
  getById
};

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch('http://localhost:8080/questions', requestOptions).then(handleResponse);
}

function getById(id, user_id) {
  console.log(user_id);
  const requestOptions = {
    method: 'GET'
    // Should this be protected?
  };

  return fetch(`http://localhost:8080/questions/${id}?user_id=${user_id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) { 
    return Promise.reject(response.statusText);
  }

  return response.json();
}
