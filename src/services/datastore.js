/* eslint-disable array-callback-return */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'http://project-mcv.herokuapp.com/api';


export const startupSearch = (searchterm, callback) => {
  axios.get(`${ROOT_URL}/startups-search/${searchterm}`, { headers: { authorization: localStorage.getItem('token') } })
    .then((response) => {
      response.data.map((startup) => {
        // console.log('startup: ', startup);
        if (startup.posts !== undefined) {
          startup.posts.map((id) => {
            // console.log('postid: ', id);
            callback(id);
            // callback(postByID(id));
          });
        }
      });
    //   console.log('startup response:', response.data);
    })
    .catch((error) => {
      console.log('broken: ', error);
      return error;
    });
};

export const postingsSearch = (searchterm, callback) => {
  axios.get(`${ROOT_URL}/posts-search/${searchterm}`, { headers: { authorization: localStorage.getItem('token') } })
    .then((response) => {
      response.data.map((post) => {
        callback(post);
      });
      console.log('post response:', response.data);
    //   callback(response.data);
    })
    .catch((error) => {
      console.log('broken from postings search ');
      return error;
    });
};

export const postByID = (id) => {
  axios.get(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
    .then((response) => {
      console.log('from ds method: ', response.data);
      return response.data;
    })
    .catch((error) => {
      console.log('broken from post by id');
      return error;
    });
};

export const startupByID = (id, callback) => {
  axios.get(`${ROOT_URL}/startups/${id}`, { headers: { authorization: localStorage.getItem('token') } })
    .then((response) => {
    //   console.log(response.data);
      callback(response.data);
    })
    .catch((error) => {
      console.log('broken: ', error);
      return error;
    });
};
