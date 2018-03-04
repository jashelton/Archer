import { SecureHeaders } from '../helpers';

export const bookmarkService = {
  list
};

function list(user_id) {
  const requestOptions = SecureHeaders.requestOptions('GET');

  return fetch(`${process.env.REACT_APP_BASEURL}/bookmarks/${user_id}`, requestOptions)
    .then(response => {
      if(!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    });
}
