import { snackbarConstants } from '../constants';

export const snackbarActions = {
  open,
  close
};

function open(message) {
  return dispatch => dispatch(open(message));

  function open(message) { return { type: snackbarConstants.OPEN_SNACKBAR, message } }
}

function close(filter) {
  return dispatch => dispatch(close());

  function close(filter) { return { type: snackbarConstants.CLOSE_SNACKBAR } }
}
