/* eslint-disable array-callback-return */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'http://project-mcv.herokuapp.com/api';


export const startupSearch = (searchterm, callback) => {
  axios.get(`${ROOT_URL}/startups-search/${searchterm}`, { headers: { authorization: localStorage.getItem('token') } })
    .then((response) => {
      console.log('data response:', response.data);
      callback(response.data);
    })
    .catch((error) => {
      console.log('broken: ', error);
      return error;
    });
};

export const intIndustriesByID = (idArray, callback) => {
  axios.get(`${ROOT_URL}/industries/${idArray}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
    // console.log('industries from db: ', response.data);
    response.data.map((industry) => {
      callback(industry);
    });
    // callback(response.data);
  }).catch((error) => {
    console.log('broken: ', error);
    return error;
  });
};

export const classesByID = (idArray, callback) => {
  axios.get(`${ROOT_URL}/classes/${idArray}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
    // console.log('classes from db: ', response.data);
    response.data.map((singleClass) => {
      callback(singleClass);
    });
  }).catch((error) => {
    console.log('broken: ', error);
    return error;
  });
};

export const skillsByID = (idArray, callback) => {
  axios.get(`${ROOT_URL}/skills/${idArray}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
    // console.log('skills from db: ', response.data);
    response.data.map((skill) => {
      callback(skill);
    });
  }).catch((error) => {
    console.log('broken: ', error);
    return error;
  });
};
