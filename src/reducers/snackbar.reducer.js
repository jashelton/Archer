import { snackbarConstants } from '../constants';

export function snackbar(snackbar = {open: false, message: null}, action) {
  switch (action.type) {
    case snackbarConstants.OPEN_SNACKBAR:
      return { open: true, message: action.message };
    case snackbarConstants.CLOSE_SNACKBAR:
      return { open: false };
    default:
      return snackbar;
  }
}
