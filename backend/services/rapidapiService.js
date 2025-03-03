const axios = require('axios');

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;

exports.fetchOpenEndedSchemes = async (fundFamily) => {
  // Assumes the API accepts "fundFamily" and "schemeType" parameters
  
  
  const options = {
    method: 'GET',
    url: `https://${RAPIDAPI_HOST}/master`,
    params: { fundFamily, schemeType: 'open-ended' },
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST
    }
  };

  const response = await axios.request(options);
  return response.data;
};

exports.fetchLatestNav = async (schemeName) => {
  // Assumes the API can return the latest NAV for a given scheme
  const options = {
    method: 'GET',
    url: `https://${RAPIDAPI_HOST}/`,
    params: { schemeName },
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST
    }
  };

  const response = await axios.request(options);
  // Adjust based on the actual API response format
  const latestNav = response.data.latestNav || response.data.nav;
  return latestNav;
};
