// keys for actiontypes
export const ActionTypes = {
  FETCH_JOB: 'FETCH_JOB',
  FETCH_JOBS: 'FETCH_JOBS',
  FETCH_STARTUP: 'FETCH_STARTUP',
  FETCH_STARTUPS: 'FETCH_STARTUPS',
};

export function fetchJob() {
  return {
    type: ActionTypes.FETCH_JOB,
    payload: null,
  };
}

export function fetchJobs() {
  return {
    type: ActionTypes.FETCH_JOBS,
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
