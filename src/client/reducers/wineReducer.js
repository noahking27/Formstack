const INITIAL_STATE = {
  wines: [],
  vintageYears: []
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'FETCH_WINES_SUCCESS':
    return Object.assign({}, state, {
      allWines: action.payload.allWines,
      wines: action.payload.wines,
      vintageYears: action.payload.vintageYears
    });
  case 'UPDATE_WINES':
    return Object.assign({}, state, {
      wines: action.payload.wines,
      vintageYears: action.payload.vintageYears
    });
  default:
    return state;
  }
};

export default reducer;
