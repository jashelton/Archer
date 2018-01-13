import { questionConstants } from '../constants';

// For all polls -> / (currently)
export function questions(state = {}, action) {
  switch (action.type) {
    case questionConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case questionConstants.GETALL_SUCCESS:
      return {
        items: action.questions
      };
    case questionConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}

// For individual poll -> /question/:id
export function question(state = {}, action) {
  switch (action.type) {
    case questionConstants.GETONE_REQUEST:
      return {
        loading: true
      };
    case questionConstants.GETONE_SUCCESS:
      return {
        items: action.question
      };
    case questionConstants.GETONE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
