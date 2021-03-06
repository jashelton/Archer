import { filterConstants } from '../constants';

export function filters(filters = [], action) {
  switch (action.type) {
    case filterConstants.GET_FILTERS:
      return [...filters];
    case filterConstants.ADD_FILTER:
      return [...filters, {text: action.filter, question_id: action.question_id}];
    case filterConstants.DELETE_FILTER:
      let currentFilters = [...filters];
      let filterToDelete = currentFilters.indexOf(action.filter);

      currentFilters.splice(filterToDelete, 1);
      return currentFilters;
    default:
      return filters;
  }
}
