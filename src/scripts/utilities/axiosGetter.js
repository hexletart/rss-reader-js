/* eslint-disable no-console */
import axios from 'axios';

export default (url) => axios
  .get(url)
  .then((response) => {
    // console.log('RESPONSE ===> ', response);
    console.log('RESPONSE ==> ', response);
    console.log('RESPONSE.DATA ==> ', response.data);
    return response.data;
  })
  .catch((err) => { throw err; });
