import { filterConstants } from '../constants';

export const filterActions = {
  getFilters,
  addFilter,
  deleteFilter
};

function getFilters() {
  return dispatch => dispatch(getFilters());

  function getFilters() { return { type: filterConstants.GET_FILTERS } }
}

function addFilter(filter, question_id) {
  return dispatch => dispatch(addFilter(filter, question_id));

  function addFilter(filter) { return { type: filterConstants.ADD_FILTER, filter, question_id } }
}

function deleteFilter(filter) {
  return dispatch => dispatch(deleteFilter(filter));

  function deleteFilter(filter) { return { type: filterConstants.DELETE_FILTER, filter } }
}