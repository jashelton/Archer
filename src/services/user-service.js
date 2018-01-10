export const userService = {
  login,
  logout,
  // register,
  // getAll,
  // getById,
  // update,
  // delete: _delete
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch('http://localhost:8080/login', requestOptions)
    .then(response => {
      if(!response.ok) { // LEARN: where is response.ok? -> returned from backend.  ok: boolean
        return Promise.reject(response.statusText);
      }

      return response.json();
    })
    .then(user => {
      if (user && user.token) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
}

function logout() {
  localStorage.removeItem('user');
}
