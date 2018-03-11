import { SecureHeaders } from '../helpers';

export const commentsService = {
  threads_by_poll,
  comments_by_thread,
  create,
  newThread
};

function threads_by_poll(poll_id) {
  const requestOptions = SecureHeaders.requestOptions('GET');

  return fetch(`${process.env.REACT_APP_BASEURL}/threads/${poll_id}`, requestOptions)
    .then(response => {
      if(!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    });
}

function comments_by_thread(thread_id) {
  const requestOptions = SecureHeaders.requestOptions('GET');

  return fetch(`${process.env.REACT_APP_BASEURL}/comments/${thread_id}`, requestOptions)
    .then(response => {
      if(!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    });
}

// Add comment
function create(commentData) {
  const requestOptions = SecureHeaders.requestOptions('POST', {commentData});
  return fetch(`${process.env.REACT_APP_BASEURL}/comments`, requestOptions)
    .then(response => {
      if(!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    });
}

// Add Thread
function newThread(threadData) {
  const requestOptions = SecureHeaders.requestOptions('POST', {threadData});
  return fetch(`${process.env.REACT_APP_BASEURL}/threads`, requestOptions)
    .then(response => {
      if(!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    });
}
