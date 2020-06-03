import axios from 'axios';

const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'http://project-mcv.herokuapp.com/api';

// keys for actiontypes
export const ActionTypes = {
  FETCH_USER: 'FETCH_USER',
  FETCH_POST: 'FETCH_POST',
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_STARTUP: 'FETCH_STARTUP',
  FETCH_STARTUPS: 'FETCH_STARTUPS',
  FETCH_STUDENT: 'FETCH_STUDENT',
  CREATE_STUDENT: 'CREATE_STUDENT',
  FETCH_STUDENTS: 'FETCH_STUDENTS',
  FETCH_STUDENT_USER: 'FETCH_STUDENT_USER',
  FETCH_WORK_EXPS: 'FETCH_WORK_EXPS',
  ADD_WORK_EXP: 'ADD_WORK_EXP',
  UPDATE_WORK_EXP: 'UPDATE_WORK_EXP',
  DELETE_WORK_EXP: 'DELETE_WORK_EXP',
  FETCH_OTHER_EXPS: 'FETCH_OTHER_EXPS',
  ADD_OTHER_EXP: 'ADD_OTHER_EXP',
  UPDATE_OTHER_EXP: 'UPDATE_OTHER_EXP',
  DELETE_OTHER_EXP: 'DELETE_OTHER_EXP',
  FETCH_APPLICATIONS: 'FETCH_APPLICATIONS',
  FETCH_APPLICATION: 'FETCH_APPLICATION',
  FETCH_QUESTIONS: 'FETCH_QUESTIONS',
  FETCH_QUESTION: 'FETCH_QUESTION',
  FETCH_SUBMITTED_APPLICATIONS: 'FETCH_SUBMITTED_APPLICATIONS',
  FETCH_SUBMITTED_APPLICATION: 'FETCH_SUBMITTED_APPLICATION',
  FETCH_ALL_INDUSTRIES: 'FETCH_ALL_INDUSTRIES',
  FETCH_SOME_INDUSTRIES: 'FETCH_SOME_INDUSTRIES',
  ADD_INDUSTRY: 'ADD_INDUSTRY',
  FETCH_ALL_SKILLS: 'FETCH_ALL_SKILLS',
  FETCH_SOME_SKILLS: 'FETCH_SOME_SKILLS',
  ADD_SKILL: 'ADD_SKILL',
  FETCH_ALL_CLASSES: 'FETCH_ALL_CLASSES',
  FETCH_SOME_CLASSES: 'FETCH_SOME_CLASSES',
  ADD_CLASS: 'ADD_CLASS',
  SUBMIT_APPLICATION: 'SUBMIT_APPLICATION',
  ERROR_SET: 'ERROR_SET',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  LOGOUT_USER: 'LOGOUT_USER',
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

// Moved to front-end implementation of search and filter, as per Thomas' advice

// export function fetchPostSearch(searchterm) {
//   return (dispatch) => {
//     axios.get(`${ROOT_URL}/posts-search/${searchterm}`, { headers: { authorization: localStorage.getItem('token') } })
//       .then((response) => {
//         dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
//       })
//       .catch((error) => {
//         dispatch({ type: ActionTypes.ERROR_SET, error });
//       });
//   };
// }

// export const getFilteredPosts = (industryNames, skillNames) => {
//   return (dispatch) => {
//     axios.get(`${ROOT_URL}/posts-filter/${industryNames}/${skillNames}`, { headers: { authorization: localStorage.getItem('token') } })
//       .then((response) => {
//         dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
//       })
//       .catch((error) => {
//         console.log('broken');
//       });
//   };
// };

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

export function updatePost(id, post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

// startup functions
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

// For getting the current startup user's info
export function fetchStartupByUserID(userID) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/startupprofile/${userID}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_STARTUP, payload: response.data });
    }).catch((error) => {
      console.log(error);
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

export function updateStartup(id, startup) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/startups/${id}`, startup, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_STARTUP, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

// export function fetchSearchResults(searchterm) {
// student functions
export function createStudent(newStudent) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/students`, newStudent, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        console.log(response.data);
        dispatch({ type: ActionTypes.CREATE_STUDENT, payload: response.data });
        console.log('student profile created');
      })
      .catch((error) => {
        console.log(error.response.data);
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

// Moved search to frontend
// export function fetchStartupSearch(searchterm) {
//   return (dispatch) => {
//     axios.get(`${ROOT_URL}/startups-search/${searchterm}`, { headers: { authorization: localStorage.getItem('token') } })
//       .then((response) => {
//         dispatch({ type: ActionTypes.FETCH_STARTUPS, payload: response.data });
//       })
//       .catch((error) => {
//         dispatch({ type: ActionTypes.ERROR_SET, error });
//       });
//   };
// }

export function fetchStudents() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/students`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_STUDENTS, payload: response.data });
      })
      .catch((error) => {
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

// For a startup clicking on a student to see their profile
export function fetchUserByStudentID(studentID) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/studentuser/${studentID}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_STUDENT_USER, payload: response.data });
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
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

export function submitStudent(id, student, history) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/students/${id}`, student, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_STUDENT, payload: response.data });
      // eslint-disable-next-line no-restricted-globals
      history.push('/profile');
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

export function submitStartup(id, startup, history) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/startups/${id}`, startup, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_STARTUP, payload: response.data });
      // eslint-disable-next-line no-restricted-globals
      history.push('/startupprofile');
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

// work experience functions
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

export function createWorkExperience(workExp) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/workexperiences`, workExp, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.ADD_WORK_EXP, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

export function updateWorkExperience(id, workExp) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/workexperiences/${id}`, workExp, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.UPDATE_WORK_EXP, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

export function deleteWorkExperience(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/workexperiences/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.DELETE_WORK_EXP, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

// industries functions
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

export function createIndustry(industry) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/industries`, industry, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.ADD_INDUSTRY, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

export function createIndustryForStudent(industry, student) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/industries`, industry, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.ADD_INDUSTRY, payload: response.data });
      // Update the student with the newly created industry
      student.interested_industries.push(response.data);
      axios.put(`${ROOT_URL}/students/${student._id}`, student, { headers: { authorization: localStorage.getItem('token') } }).then((response2) => {
        dispatch({ type: ActionTypes.FETCH_STUDENT, payload: response2.data });
      }).catch((error2) => {
        console.log(error2);
        dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error2.message });
      });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}


export function createIndustryForStartup(industry, startup) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/industries`, industry, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.ADD_INDUSTRY, payload: response.data });
      // Update the student with the newly created industry
      startup.industries.push(response.data);
      axios.put(`${ROOT_URL}/startups/${startup._id}`, startup, { headers: { authorization: localStorage.getItem('token') } }).then((response2) => {
        dispatch({ type: ActionTypes.FETCH_STARTUP, payload: response2.data });
      }).catch((error2) => {
        console.log(error2);
        dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error2.message });
      });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

// skills functions
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

export function createSkill(skill) {
  console.log(skill);
  return (dispatch) => {
    axios.post(`${ROOT_URL}/skills`, skill, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      console.log(response.data);
      dispatch({ type: ActionTypes.ADD_SKILL, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

export function createSkillForStudent(skill, student) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/skills`, skill, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.ADD_SKILL, payload: response.data });
      // Update the student with the newly created skill
      student.skills.push(response.data);
      axios.put(`${ROOT_URL}/students/${student._id}`, student, { headers: { authorization: localStorage.getItem('token') } }).then((response2) => {
        dispatch({ type: ActionTypes.FETCH_STUDENT, payload: response2.data });
      }).catch((error2) => {
        console.log(error2);
        dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error2.message });
      });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

// classes functions
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

export function createClass(_class) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/classes`, _class, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.ADD_CLASS, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

export function createClassForStudent(_class, student) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/classes`, _class, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.ADD_CLASS, payload: response.data });
      // Update the student with the newly created class
      student.relevant_classes.push(response.data);
      axios.put(`${ROOT_URL}/students/${student._id}`, student, { headers: { authorization: localStorage.getItem('token') } }).then((response2) => {
        dispatch({ type: ActionTypes.FETCH_STUDENT, payload: response2.data });
      }).catch((error2) => {
        console.log(error2);
        dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error2.message });
      });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

// applications functions
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

export function fetchQuestions() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/questions`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_QUESTIONS, payload: response.data });
      })
      .catch((error) => {
        console.log('broken');
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

// submitted application functions
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

// otherExperience functions
export function createOtherExperience(otherExp) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/otherexperiences`, otherExp, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.ADD_OTHER_EXP, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function updateOtherExperience(id, otherExp) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/otherexperiences/${id}`, otherExp, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.UPDATE_OTHER_EXP, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function deleteOtherExperience(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/otherexperiences/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.DELETE_OTHER_EXP, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function fetchOtherExperiences(idArray) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/otherexperiences/${idArray}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_OTHER_EXPS, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

// from lab5 auth
// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  // lab5
  // trigger to deauth if there is error
  // can also use in your error reducer if you have one to display an error message
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
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.id); // can maybe take out
      axios.get(`${ROOT_URL}/users/${response.data.id}`, { headers: { authorization: response.data.token } }).then((userResp) => {
        dispatch({ type: ActionTypes.AUTH_USER, userID: response.data.id });
        if (response.data.role === 'student' || response.data.role === 'admin') {
          history.push('/posts');
        } else if (response.data.role === 'startup') {
          history.push('/students');
        }
        dispatch({ type: ActionTypes.FETCH_USER, payload: userResp.data });
      }).catch((error) => {
        console.log(error);
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
    }).catch((error) => {
      console.log(error.response.data);
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

export function signupUser({
  // eslint-disable-next-line camelcase
  email, password, role, student_profile_id, startup_id,
}, history) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  // on success does:
  //  dispatch({ type: ActionTypes.AUTH_USER });
  //  localStorage.setItem('token', response.data.token);
  // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, {
      email, password, role, student_profile_id, startup_id,
    }).then((response) => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.id); // can maybe take out
      dispatch({ type: ActionTypes.AUTH_USER, userID: response.data.id });
      // dispatch({ type: ActionTypes.AUTH_USER });
      if (role === 'student') {
        history.push('/student-signup');
      } else if (role === 'startup') {
        history.push('/startup-signup');
      } // and maybe add admin as well
      console.log('signed up succesfully');
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
    history.push('/signin');
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

export function clearUserState() {
  // console.log('clear called');
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOGOUT_USER });
  };
}


export function updateUser(id, user) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/users/${id}`, user, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
    }).catch((error) => {
      console.log(error);
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}
