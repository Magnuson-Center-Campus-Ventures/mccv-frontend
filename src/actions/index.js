import axios from 'axios';

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'http://project-mcv.herokuapp.com/api';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POST: 'FETCH_POST',
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_STARTUP: 'FETCH_STARTUP',
  FETCH_STARTUPS: 'FETCH_STARTUPS',
  FETCH_STUDENT: 'FETCH_STUDENT',
  FETCH_STUDENTS: 'FETCH_STUDENTS',
  ERROR_SET: 'ERROR_SET',
};

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      })
      .catch((error) => {
        console.log('broken');
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchPost() {
  return {
    type: ActionTypes.FETCH_POST,
    payload: null,
  };
}

export function fetchStartup() {
  return {
    type: ActionTypes.FETCH_STARTUP,
    payload: null,
  };
}

export function fetchStartups() {
  return {
    type: ActionTypes.FETCH_STARTUPS,
    payload: null,
  };
}

export function fetchStudent() {
  return {
    type: ActionTypes.FETCH_STUDENT,
    payload: null,
  };
}

export function fetchStudents() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/students`)
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_STUDENTS, payload: response.data });
      })
      .catch((error) => {
        console.log('broken fetchStudents');
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}
