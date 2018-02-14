import { SecureHeaders } from '../helpers';

export const bookmarkService = {
  list
};

function list(user_id) {
  const requestOptions = SecureHeaders.requestOptions('GET');

  return fetch(`http://localhost:8080/bookmarks/${user_id}`, requestOptions)
    .then(response => {
      if(!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    });
}
