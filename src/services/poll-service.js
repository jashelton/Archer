export const pollService = {
  submit,
  create
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

      return response.json()
    });

}