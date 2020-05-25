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
  FETCH_APPLICATIONS: 'FETCH_APPLICATIONS',
  FETCH_APPLICATION: 'FETCH_APPLICATION',
  SUBMIT_APPLICATION: 'SUBMIT_APPLICATION',
  UPDATE_WORK_EXP: 'UPDATE_WORK_EXP',
  DELETE_WORK_EXP: 'DELETE_WORK_EXP',
  ERROR_SET: 'ERROR_SET',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      })
      .catch((error) => {
        console.log('broken');
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
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
    axios.get(`${ROOT_URL}/students`, { headers: { authorization: localStorage.getItem('token') } })
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
    axios.get(`${ROOT_URL}/students/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
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
    axios.get(`${ROOT_URL}/profile/${userID}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: 'FETCH_STUDENT', payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function updateStudent(id, student) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/students/${id}`, student, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: 'FETCH_STUDENT', payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function fetchWorkExperiences(idArray) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/workexperiences`, { params: { idArray } }, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: 'FETCH_WORK_EXPS', payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function updateWorkExperience(id, workExp) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/workexperiences/${id}`, workExp, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: 'UPDATE_WORK_EXP', payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function deleteWorkExperience(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/workexperiences/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: 'DELETE_WORK_EXP', payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}
export function fetchApplications() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/applications`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_APPLICATIONS, payload: response.data });
      })
      .catch((error) => {
        console.log('broken');
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}
export function fetchApplication(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/applications/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_APPLICATION, payload: response.data });
      })
      .catch((error) => {
        console.log('broken');
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}
export function submitApplication(newApplication) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/submittedapplications`, newApplication, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        console.log(response);
        dispatch({ type: ActionTypes.SUBMIT_APPLICATION, payload: response.data });
      })
      .catch((error) => {
        console.log('broken');
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

// from lab5 auth
// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ email, password }, history) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signin endpoint
  // on success does:
  // dispatch({ type: ActionTypes.AUTH_USER, id: result.id });
  // localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {
      console.log('in delete');
      dispatch({ type: ActionTypes.AUTH_USER, id: response.id });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    }).catch((error) => {
      console.log(error.response.data);
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

export function signupUser({ email, password }, history) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password }).then((response) => {
      localStorage.setItem('token', response.data.token);
      console.log('signed up succesfully');
      dispatch({ type: ActionTypes.AUTH_USER });
      history.push('/');
    }).catch((error) => {
      // eslint-disable-next-line no-alert
      console.log(error.response.data);
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    // history.push('/');
  };
}
