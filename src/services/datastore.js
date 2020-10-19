/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'http://mccv.herokuapp.com/api';

export const fetchIndustriesFromID = (idArray, callback) => {
  axios.get(`${ROOT_URL}/industries/${idArray}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
    response.data.forEach((industry) => {
      callback(industry);
    });
  }).catch((error) => {
    // console.log(error);
    return (error);
  });
};

export const fetchSkillsFromID = (idArray, callback) => {
  axios.get(`${ROOT_URL}/skills/${idArray}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
    callback(response.data);
  }).catch((error) => {
    return (error);
  });
};

export const fetchClassesFromID = (idArray, callback) => {
  axios.get(`${ROOT_URL}/classes/${idArray}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
    callback(response.data);
  }).catch((error) => {
    return (error);
  });
};
