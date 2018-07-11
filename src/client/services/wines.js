import axios from 'axios';

function getWines() {
  // replace with a call to the server
  // Added Axios package for fetching data
  const wineData = axios.get('/api/v1/wines').then(res => {
    return res.data;
  });

  return Promise.resolve(wineData);
}

export default {
  getWines
};
