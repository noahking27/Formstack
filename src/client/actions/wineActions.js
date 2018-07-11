import wineService from '../services/wines';

function fetchWines() {
  return function(dispatch) {
    return wineService.getWines()
      .then(({ wines }) => {
        const vintageYearsArray = [];

        wines.forEach((wine) => {
          vintageYearsArray.push(wine.vintage);
        });

        // Remove any duplicate vintage years
        const dedupVintageYears = [ ...new Set(vintageYearsArray)];
        dispatch({
          type: 'FETCH_WINES_SUCCESS',
          payload: {
            wines,
            allWines: wines,
            vintageYears: dedupVintageYears
          }
        });
      });
  };
}

function updateWines(wines, vintageYears) {
  return function(dispatch) {
    dispatch({
      type: 'UPDATE_WINES',
      payload: {
        wines,
        vintageYears
      }
    });
  };
}
export {
  fetchWines, updateWines
};
