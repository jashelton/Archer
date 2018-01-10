import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { questions } from './question.reducer';
// import { users } from './users.reducer';

const rootReducer = combineReducers({
  authentication,
  questions
});

export default rootReducer;

// LEARN: Need to dig into all of this.