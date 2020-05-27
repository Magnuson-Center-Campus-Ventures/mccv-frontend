import axios from 'axios';

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'http://project-mcv.herokuapp.com/api';

// keys for actiontypes
export const ActionTypes = {
  FETCH_USER: 'FETCH_USER',
  FETCH_POST: 'FETCH_POST',
  FETCH_POSTS: 'FETCH_POSTS',
  // SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  FETCH_STARTUP: 'FETCH_STARTUP',
  FETCH_STARTUPS: 'FETCH_STARTUPS',
  FETCH_STUDENT: 'FETCH_STUDENT',
  FETCH_STUDENTS: 'FETCH_STUDENTS',
  FETCH_WORK_EXPS: 'FETCH_WORK_EXPS',
  FETCH_APPLICATIONS: 'FETCH_APPLICATIONS',
  FETCH_APPLICATION: 'FETCH_APPLICATION',
  FETCH_SUBMITTED_APPLICATIONS: 'FETCH_SUBMITTED_APPLICATIONS',
  FETCH_SUBMITTED_APPLICATION: 'FETCH_SUBMITTED_APPLICATION',
  FETCH_ALL_INDUSTRIES: 'FETCH_ALL_INDUSTRIES',
  FETCH_SOME_INDUSTRIES: 'FETCH_SOME_INDUSTRIES',
  FETCH_ALL_SKILLS: 'FETCH_ALL_SKILLS',
  FETCH_SOME_SKILLS: 'FETCH_SOME_SKILLS',
  FETCH_ALL_CLASSES: 'FETCH_ALL_CLASSES',
  FETCH_SOME_CLASSES: 'FETCH_SOME_CLASSES',
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

export function fetchPostSearch(searchterm) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${searchterm}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      })
      .catch((error) => {
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

export function fetchStartup(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/startups/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_STARTUP, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchStartups() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/startups`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_STARTUPS, payload: response.data });
      })
      .catch((error) => {
        console.log('broken');
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchSearchResults(searchterm) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/startups/${searchterm}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        // console.log('here');
        dispatch({ type: ActionTypes.FETCH_STARTUPS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
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
      dispatch({ type: ActionTypes.FETCH_STUDENT, payload: response.data });
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
      dispatch({ type: ActionTypes.FETCH_STUDENT, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function updateStudent(id, student) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/students/${id}`, student, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_STUDENT, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function fetchWorkExperiences(idArray) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/workexperiences/${idArray}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_WORK_EXPS, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function updateWorkExperience(id, workExp) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/workexperiences/${id}`, workExp, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.UPDATE_WORK_EXP, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function deleteWorkExperience(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/workexperiences/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.DELETE_WORK_EXP, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function fetchAllIndustries() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/industries`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_ALL_INDUSTRIES, payload: response.data });
      })
      .catch((error) => {
        console.log('broken');
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchCertainIndustries(idArray) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/industries/${idArray}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_SOME_INDUSTRIES, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function fetchAllSkills() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/skills`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_ALL_SKILLS, payload: response.data });
      })
      .catch((error) => {
        console.log('broken');
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchCertainSkills(idArray) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/skills/${idArray}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_SOME_SKILLS, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function fetchAllClasses() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/classes`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_ALL_CLASSES, payload: response.data });
      })
      .catch((error) => {
        console.log('broken');
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchCertainClasses(idArray) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/classes/${idArray}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_SOME_CLASSES, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
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

export function fetchSubmittedApplications() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/submittedapplications`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_SUBMITTED_APPLICATIONS, payload: response.data });
      })
      .catch((error) => {
        console.log('broken');
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchSubmittedApplication(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/submittedapplications/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_SUBMITTED_APPLICATION, payload: response.data });
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
      dispatch({ type: ActionTypes.AUTH_USER, id: response.data.id });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.id);
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
      localStorage.setItem('userID', response.data.id);
      console.log('signed up succesfully');
      dispatch({ type: ActionTypes.AUTH_USER, id: response.data.id });
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

export function fetchUser(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}
