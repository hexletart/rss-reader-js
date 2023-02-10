import axios from 'axios';

export default (url) => axios
  .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
  .then((response) => {
    console.log('RESPONSE ===> ', response);
    console.log('RESPONSE.DATA ====> ', response.data);
    return response.data;
  })
  .catch((err) => { throw err; });
