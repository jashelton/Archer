export const pollService = {
  submit,
  create,
  addFavorite,
  deleteFavorite
};

function submit(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({data})
  };

  return fetch('http://localhost:8080/response', requestOptions)
    .then(response => {
      if(!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json()
    });
}

function create(poll) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({poll})
  };

  return fetch('http://localhost:8080/create', requestOptions)
    .then(response => {
      if(!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    });

}

function addFavorite(user_id, poll) {
  const data = {
    user_id,
    poll,
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }

  return fetch('http://localhost:8080/favorites', requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    });
}

function deleteFavorite(user_id, poll_id) {
  const data = {
    user_id,
    poll_id
  };

  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  return fetch('http://localhost:8080/favorites', requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    })
}