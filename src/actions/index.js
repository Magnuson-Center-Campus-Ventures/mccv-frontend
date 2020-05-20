import axios from 'axios';

const ROOT_URL = 'http://localhost:9090/api';

// keys for actiontypes
export const ActionTypes = {
  FETCH_JOB: 'FETCH_JOB',
  FETCH_JOBS: 'FETCH_JOBS',
  FETCH_STARTUP: 'FETCH_STARTUP',
  FETCH_STARTUPS: 'FETCH_STARTUPS',
  FETCH_STUDENT: 'FETCH_STUDENT',
  FETCH_STUDENTS: 'FETCH_STUDENTS',
  ERROR_SET: 'ERROR_SET',
};

export function fetchJobs() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/jobposts`)
      .then((response) => {
        // console.log('index: ', response.data);
        dispatch({ type: ActionTypes.FETCH_JOBS, payload: response.data });
      })
      .catch((error) => {
        console.log('broken');
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchJob() {
  return {
    type: ActionTypes.FETCH_JOB,
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
        // console.log('index: ', response.data);
        dispatch({ type: ActionTypes.FETCH_STUDENTS, payload: response.data });
      })
      .catch((error) => {
        console.log('broken fetchStudents');
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}
