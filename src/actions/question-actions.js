import { questionConstants } from '../constants';
import { questionService } from '../services';
import { history } from '../helpers/index';

export const questionActions = {
  getAll,
  getById
};

function getAll(user_id) {
  return dispatch => {
    dispatch(request());

    questionService.getAll(user_id)
      .then(
        questions => dispatch(success(questions.data)),
        error => dispatch(failure(error))
      );
  }


  function request() { return { type: questionConstants.GETALL_REQUEST } }
  function success(questions) { return { type: questionConstants.GETALL_SUCCESS, questions } }
  function failure(error) { return { type: questionConstants.GETALL_FAILURE } }
}

function getById(id, user_id) {
  return dispatch => {
    dispatch(request());

    questionService.getById(id, user_id)
      .then(
        question => {
          // If user has already taken the poll, redirect them to the results page.
          if (question.data.has_taken) {
            history.replace(`/results/${id}`);
          }
          dispatch(success(question.data))
        },
        error => dispatch(failure(error))
      );
  }

  function request() { return { type: questionConstants.GETONE_REQUEST } }
  function success(question) { return { type: questionConstants.GETONE_SUCCESS, question } }
  function failure(error) { return { type: questionConstants.GETONE_FAILURE } }
}