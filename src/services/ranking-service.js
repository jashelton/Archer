import { SecureHeaders } from '../helpers';

export const rankingService = {
  createOrUpdatePollRanking,
  createOrUpdateCommentRanking
}

function createOrUpdatePollRanking(data) {
  const requestOptions = SecureHeaders.requestOptions('POST', data);

  return fetch(`${process.env.REACT_APP_BASEURL}/ranking/${data.poll_id}/polls`, requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    });
}

function createOrUpdateCommentRanking(data) {
  const requestOptions = SecureHeaders.requestOptions('POST');
}