/* eslint-disable import/prefer-default-export */
import axios from 'axios';
// import { responsiveFontSizes } from '@material-ui/core';

const ROOT_URL = 'http://project-mcv.herokuapp.com/api';

export const startupSearch = (term) => {
  const params = {

  };
  return new Promise((resolve, reject) => {
    axios.get(ROOT_URL, { params })
      .then((response) => {
        resolve(response.data.items);
      })
      .catch((error) => {
        console.log(`api error: ${error}`);
        reject(error);
      });
  });
};

export const findStartup = (id) => {
  axios.get(`${ROOT_URL}/startups/${id}`, { headers: { authorization: localStorage.getItem('token') } })
    .then((response) => {
      console.log('from datastore: ', response.data);
      return response.data;
    })
    .catch((error) => {
      console.log('broken');
    });
};
