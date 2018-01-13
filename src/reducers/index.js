import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { questions, question } from './question.reducer';
// import { users } from './users.reducer';

const rootReducer = combineReducers({
  authentication,
  questions,
  question
});

export default rootReducer;

// LEARN: Need to dig into all of this.