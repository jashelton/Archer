import { userConstants } from '../constants';
import { userService } from '../services'; // not implemented;
// import { alertActions } from './'; // implement later
import { history } from '../helpers';

export const userActions = {
  login,
  logout,
  // register, // implementing later
  // getAll, // implementing later
  // delete: _delete // implementing later
}

function login(username, password) {
  // return dispatch =>  {
  //   dispatch(request({ username }));

  //   userService.login(username, password)
  //     .then(
  //       user => {
  //         dispatch(success(user));
  //         history.push('/');
  //       },
  //       error => {
  //         dispatch(failure(error));
  //       }
  //     );
  // };

  // function request(user) { return { type: userConstants.LOGIN_REQUEST, user } } // LEARN: is this supposed to be a clean way to handle responses?
  // function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  // function failure(error) { return { type: userConstants.LOGIN_FAILURE, user } }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT }
}
