import { SecureHeaders } from '../helpers';

export const pollService = {
  submit,
  create,
  addFavorite,
  deleteFavorite
};

function submit(data) {
  const requestOptions = SecureHeaders.requestOptions('POST', {data});

  return fetch(`${process.env.REACT_APP_BASEURL}/response`, requestOptions)
    .then(response => {
      if(!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    });
}

function create(poll) {
  const requestOptions = SecureHeaders.requestOptions('POST', {poll});

  return fetch(`${process.env.REACT_APP_BASEURL}/create`, requestOptions)
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

  const requestOptions = SecureHeaders.requestOptions('POST', data);

  return fetch(`${process.env.REACT_APP_BASEURL}/favorites`, requestOptions)
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

  const requestOptions = SecureHeaders.requestOptions('DELETE', data);

  return fetch(`${process.env.REACT_APP_BASEURL}/favorites`, requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    })
}