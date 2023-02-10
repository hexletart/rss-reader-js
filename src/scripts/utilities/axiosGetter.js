/* eslint-disable no-console */
import axios from 'axios';

export default (url) => axios
  .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
  .then((response) => {
    // console.log('RESPONSE ===> ', response);
    console.log('RESPONSE.HEADERS.GET("Via") ==> ', response.headers.get('Via'));
    console.log('RESPONSE.HEADERS["via"] ==> ', response.headers['via']);
    console.log('RESPONSE.HEADERS.VIA ==> ', response.headers.via);
    // console.log('RESPONSE.DATA ====> ', response.data);
    return response.data;
  })
  .catch((err) => { throw err; });
