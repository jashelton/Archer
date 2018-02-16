import { snackbarConstants } from '../constants';

export function snackbar(snackbar = {open: true, message: 'hello'}, action) {
  switch (action.type) {
    case snackbarConstants.OPEN_SNACKBAR:
      console.log(action);
      console.log(action.snackbar);
      return { open: true, message: action.message };
    case snackbarConstants.CLOSE_SNACKBAR:
      console.log(action);
      return { open: false };
    default:
      return snackbar;
  }
}
