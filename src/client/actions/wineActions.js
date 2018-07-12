import wineService from '../services/wines';

function fetchWines() {
  return function(dispatch) {
    return wineService.getWines()
      .then(({ wines }) => {
        // sort the wines alphabetically
        wines.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        dispatch({
          type: 'FETCH_WINES_SUCCESS',
          payload: {
            wines
          }
        });
      });
  };
}

function addWine(wines) {
  return function(dispatch) {
    // sort the wines alphabetically
    wines.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    dispatch({
      type: 'ADD_WINE',
      payload: {
        wines
      }
    });
  };
}

function deleteWine(wines) {
  return function(dispatch) {
    dispatch({
      type: 'DELETE_WINE',
      payload: {
        wines
      }
    });
  };
}

export {
  fetchWines, addWine, deleteWine
};
