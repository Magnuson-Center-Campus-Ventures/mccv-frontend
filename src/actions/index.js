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
  FETCH_WORK_EXPS: 'FETCH_WORK_EXPS',
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

// For a startup clicking on a student to see their full profile
export function fetchStudentByID(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/students/${id}`).then((response) => {
      dispatch({ type: 'FETCH_STUDENT', payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

// For getting the current student user's profile
export function fetchStudentByUserID(userID) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/profile/${userID}`).then((response) => {
      dispatch({ type: 'FETCH_STUDENT', payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function updateStudent(id, student) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/students/${id}`, student).then((response) => {
      dispatch({ type: 'FETCH_STUDENT', payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function fetchWorkExperiences(idArray) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/workexperiences`, { params: { idArray } }).then((response) => {
      dispatch({ type: 'FETCH_WORK_EXPS', payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function updateWorkExperience(id, workExp) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/workexperiences/${id}`, workExp).then((response) => {
      dispatch({ type: 'FETCH_WORK_EXPS', payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function deleteWorkExperience(id, workExp) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/workexperiences/${id}`, workExp).then((response) => {
      dispatch({ type: 'FETCH_WORK_EXPS', payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}
