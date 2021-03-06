import { userConstants } from '../constants';
import { userService } from '../services'; // not implemented;
// import { alertActions } from './'; // implement later
import { history } from '../helpers';
import { snackbarActions } from '../actions';

export const userActions = {
  login,
  logout,
  // register, // implementing later
  // getAll, // implementing later
  // delete: _delete // implementing later
}

function login(username, password, from) {
  return dispatch =>  {
    dispatch(request({ username }));

    userService.login(username, password)
      .then(
        user => {
          dispatch(success(user));
          history.push(from);
          dispatch(snackbarActions.open(`Successfully logged in as ${username}`));
        },
        error => {
          dispatch(failure(error));
          dispatch(snackbarActions.open(`Error: ${error}`))
        }
      );
  };

  // LEARN: is this supposed to be a clean way to handle responses?
  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT }
}
