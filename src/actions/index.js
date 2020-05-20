import axios from 'axios';

const ROOT_URL = 'http://localhost:9090/api';

// keys for actiontypes
export const ActionTypes = {
  FETCH_JOB: 'FETCH_JOB',
  FETCH_JOBS: 'FETCH_JOBS',
  FETCH_STARTUP: 'FETCH_STARTUP',
  FETCH_STARTUPS: 'FETCH_STARTUPS',
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
