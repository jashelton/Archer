import { questionConstants } from '../constants';
import { questionService } from '../services';

export const questionActions = {
  getAll,
  getById
};

function getAll() {
  return dispatch => {
    dispatch(request());

    questionService.getAll()
      .then(
        data => dispatch(success(data.questions)),
        error => dispatch(failure(error))
      );
  }


  function request() { return { type: questionConstants.GETALL_REQUEST } }
  function success(questions) { return { type: questionConstants.GETALL_SUCCESS, questions } }
  function failure(error) { return { type: questionConstants.GETALL_FAILURE } }
}

function getById() {

}