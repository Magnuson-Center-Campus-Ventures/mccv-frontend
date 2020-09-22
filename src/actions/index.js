import axios from 'axios';

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'http://project-mcv.herokuapp.com/api';

// keys for actiontypes
export const ActionTypes = {
  // user actions
  FETCH_USER: 'FETCH_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  UPDATE_USER: 'UPDATE_USER',
  USER_EXISTS: 'USER_EXISTS',
  // post actions
  FETCH_POST: 'FETCH_POST',
  CLEAR_POST: 'CLEAR_POST',
  FETCH_POSTS: 'FETCH_POSTS',
  UPDATE_POST: 'UPDATE_POST',
  // startup actions
  FETCH_STARTUP: 'FETCH_STARTUP',
  FETCH_STARTUPS: 'FETCH_STARTUPS',
  // student actions
  FETCH_STUDENT: 'FETCH_STUDENT',
  CLEAR_STUDENT: 'CLEAR_STUDENT',
  CREATE_STUDENT: 'CREATE_STUDENT',
  FETCH_STUDENTS: 'FETCH_STUDENTS',
  FETCH_STUDENT_USER: 'FETCH_STUDENT_USER',
  // work experience actions
  FETCH_WORK_EXPS: 'FETCH_WORK_EXPS',
  ADD_WORK_EXP: 'ADD_WORK_EXP',
  UPDATE_WORK_EXP: 'UPDATE_WORK_EXP',
  DELETE_WORK_EXP: 'DELETE_WORK_EXP',
  // other experience actions
  FETCH_OTHER_EXPS: 'FETCH_OTHER_EXPS',
  ADD_OTHER_EXP: 'ADD_OTHER_EXP',
  UPDATE_OTHER_EXP: 'UPDATE_OTHER_EXP',
  DELETE_OTHER_EXP: 'DELETE_OTHER_EXP',
  // submitted application actions
  FETCH_SUBMITTED_APPLICATIONS: 'FETCH_SUBMITTED_APPLICATIONS',
  FETCH_SUBMITTED_APPLICATION: 'FETCH_SUBMITTED_APPLICATION',
  UPDATE_SUBMITTED_APPLICATION: 'UPDATE_SUBMITTED_APPLICATION',
  SUBMIT_APPLICATION: 'SUBMIT_APPLICATION',
  CLEAR_APPLICATION: 'CLEAR_APPLICATION',
  // industry actions
  FETCH_ALL_INDUSTRIES: 'FETCH_ALL_INDUSTRIES',
  FETCH_SOME_INDUSTRIES: 'FETCH_SOME_INDUSTRIES',
  ADD_INDUSTRY: 'ADD_INDUSTRY',
  // skills actions
  FETCH_ALL_SKILLS: 'FETCH_ALL_SKILLS',
  FETCH_SOME_SKILLS: 'FETCH_SOME_SKILLS',
  ADD_SKILL: 'ADD_SKILL',
  // classes actions
  FETCH_ALL_CLASSES: 'FETCH_ALL_CLASSES',
  FETCH_SOME_CLASSES: 'FETCH_SOME_CLASSES',
  ADD_CLASS: 'ADD_CLASS',
  // password reset actions
  ADD_RESET_TOKEN: 'ADD_RESET_TOKEN',
  FETCH_RESET_TOKEN: 'FETCH_RESET_TOKEN',
  // email confirmation actions
  CONFIRM_EMAIL: 'CONFIRM_EMAIL',
  // s3 actions
  UPLOAD_IMAGE: 'UPLOAD_IMAGE',
  // general error
  ERROR_SET: 'ERROR_SET',
  // AUTH_USER: 'AUTH_USER',
  // DEAUTH_USER: 'DEAUTH_USER',
};

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function createPost(post, startup, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
        // Update the student with the newly created post
        startup.posts.push(response.data);
        axios.put(`${ROOT_URL}/startups/${startup._id}`, startup, { headers: { authorization: localStorage.getItem('token') } }).then((response2) => {
          dispatch({ type: ActionTypes.FETCH_STARTUP, payload: response2.data });
        }).catch((error2) => {
          dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error2.message });
        });
        history.push('/posts/'.concat(response.data.id,'/?edit'));
      }).catch((error) => {
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
//       });
//   };
// };

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function updatePost(id, post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

export function clearPost() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.CLEAR_POST });
  };
}

// startup functions
export function fetchStartup(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/startups/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_STARTUP, payload: response.data });
      }).catch((error) => {
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
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function fetchStartups() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/startups`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_STARTUPS, payload: response.data });
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function updateStartup(id, startup) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/startups/${id}`, startup, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_STARTUP, payload: response.data });
    }).catch((error) => {
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

// student functions
export function createStudent(newStudent) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/students`, newStudent, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.CREATE_STUDENT, payload: response.data });
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchStudents() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/students`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_STUDENTS, payload: response.data });
      }).catch((error) => {
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
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

// For getting the current student user's profile
export function fetchStudentByUserID(userID) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/profile/${userID}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      localStorage.setItem('firstName', response.data.first_name); // name for navBar
      dispatch({ type: ActionTypes.FETCH_STUDENT, payload: response.data });
    }).catch((error) => {
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
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function updateStudent(id, student) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/students/${id}`, student, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_STUDENT, payload: response.data });
    }).catch((error) => {
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
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

export function clearStudent() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.CLEAR_STUDENT });
  };
}

export function submitStartup(id, startup, history) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/startups/${id}`, startup, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_STARTUP, payload: response.data });
      // eslint-disable-next-line no-restricted-globals
      history.push('/startupprofile');
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

export function submitPost(id, post, history) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
      // eslint-disable-next-line no-restricted-globals
      history.push(`/posts/${id}`);
    }).catch((error) => {
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
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function createWorkExperience(workExp) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/workexperiences`, workExp, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.ADD_WORK_EXP, payload: response.data });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

export function updateWorkExperience(id, workExp) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/workexperiences/${id}`, workExp, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.UPDATE_WORK_EXP, payload: response.data });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

export function deleteWorkExperience(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/workexperiences/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.DELETE_WORK_EXP, payload: response.data });
    }).catch((error) => {
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
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchCertainIndustries(idArray) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/industries/${idArray}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_SOME_INDUSTRIES, payload: response.data });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function createIndustry(industry) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/industries`, industry, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.ADD_INDUSTRY, payload: response.data });
    }).catch((error) => {
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
        dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error2.message });
      });
    }).catch((error) => {
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
        dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error2.message });
      });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

export function createIndustryForPost(industry, post) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/industries`, industry, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.ADD_INDUSTRY, payload: response.data });
      // Update the post with the newly created industry
      post.industries.push(response.data);
      axios.put(`${ROOT_URL}/posts/${post._id}`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response2) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response2.data });
      }).catch((error2) => {
        dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error2.message });
      });
    }).catch((error) => {
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
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchCertainSkills(idArray) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/skills/${idArray}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_SOME_SKILLS, payload: response.data });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function createSkill(skill) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/skills`, skill, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.ADD_SKILL, payload: response.data });
    }).catch((error) => {
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
        dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error2.message });
      });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

export function createReqSkillForPost(skill, post) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/skills`, skill, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.ADD_SKILL, payload: response.data });
      // Update the post with the newly created skill
      post.required_skills.push(response.data);
      axios.put(`${ROOT_URL}/posts/${post._id}`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response2) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response2.data });
      }).catch((error2) => {
        dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error2.message });
      });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

export function createPrefSkillForPost(skill, post) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/skills`, skill, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.ADD_SKILL, payload: response.data });
      // Update the post with the newly created skill
      post.preferred_skills.push(response.data);
      axios.put(`${ROOT_URL}/posts/${post._id}`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response2) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response2.data });
      }).catch((error2) => {
        dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error2.message });
      });
    }).catch((error) => {
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
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchCertainClasses(idArray) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/classes/${idArray}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_SOME_CLASSES, payload: response.data });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function createClass(_class) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/classes`, _class, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.ADD_CLASS, payload: response.data });
    }).catch((error) => {
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
        dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error2.message });
      });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

export function createClassForPost(_class, post) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/classes`, _class, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.ADD_INDUSTRY, payload: response.data });
      // Update the student with the newly created class
      post.desired_classes.push(response.data);
      axios.put(`${ROOT_URL}/posts/${post._id}`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response2) => {
        dispatch({ type: ActionTypes.FETCH_POST, payload: response2.data });
      }).catch((error2) => {
        dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error2.message });
      });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

export function submitApplication(newApplication) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/submittedapplications`, newApplication, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.SUBMIT_APPLICATION, payload: response.data });
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function clearApplication() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.CLEAR_APPLICATION });
  };
}

// submitted application functions
export function fetchSubmittedApplications() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/submittedapplications`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_SUBMITTED_APPLICATIONS, payload: response.data });
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchSubmittedApplication(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/submittedapplications/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_SUBMITTED_APPLICATION, payload: response.data });
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function updateSubmittedApplication(id, submittedApp) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/submittedapplications/${id}`, submittedApp, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.UPDATE_SUBMITTED_APPLICATION, payload: response.data });
    }).catch((error) => {
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

// otherExperience functions
export function createOtherExperience(otherExp) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/otherexperiences`, otherExp, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.ADD_OTHER_EXP, payload: response.data });
    }).catch((error) => {
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function updateOtherExperience(id, otherExp) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/otherexperiences/${id}`, otherExp, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.UPDATE_OTHER_EXP, payload: response.data });
    }).catch((error) => {
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function deleteOtherExperience(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/otherexperiences/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.DELETE_OTHER_EXP, payload: response.data });
    }).catch((error) => {
      dispatch({ type: ActionTypes.SET_ERROR, errorMessage: error.message });
    });
  };
}

export function fetchOtherExperiences(idArray) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/otherexperiences/${idArray}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_OTHER_EXPS, payload: response.data });
    }).catch((error) => {
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
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.user.id);
      localStorage.setItem('role', response.data.user.role);
      axios.get(`${ROOT_URL}/users/${response.data.user.id}`, { headers: { authorization: response.data.token } }).then((userResp) => {
        dispatch({ type: ActionTypes.FETCH_USER, payload: response.data.user });
        if (response.data.user.role === 'student' || response.data.user.role === 'admin') {
          history.push('/posts');
        } else if (response.data.user.role === 'startup') {
          history.push('/students');
        }
        dispatch({ type: ActionTypes.FETCH_USER, payload: userResp.data });
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
    }).catch((error) => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

export function signupUser({
  email, password, role, student_profile_id, startup_id,
}, history) {
  // takes in an object with email and password (minimal user object)
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  // does an axios.post on the /signup endpoint (only difference from above)
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, {
      email, password, role, student_profile_id, startup_id,
    }).then((response) => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.user.id);
      localStorage.setItem('role', response.data.user.role);
      // dispatch({ type: ActionTypes.AUTH_USER, userID: response.data.id });
      dispatch({ type: ActionTypes.FETCH_USER, payload: response.data.user });
      if (response.data.user.role === 'student') {
        history.push('/student-signup');
      } else if (response.data.user.role === 'startup') {
        history.push('/startup-signup');
      } else if (response.data.user.role === 'admin') { // likely not to reach here as no option to determine role of admin
        history.push('/posts');
      }
    }).catch((error) => {
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.clear();
    dispatch({ type: ActionTypes.LOGOUT_USER });
    history.push('/signin');
  };
}


export function fetchUser(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function fetchUsers() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function updateUser(id, user) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/users/${id}`, user, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, errorMessage: error.message });
    });
  };
}

// ADD_RESET_TOKEN: 'ADD_RESET_TOKEN',
// FETCH_RESET_TOKEN: 'FETCH_RESET_TOKEN',

export function createResetToken({ email, } , history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/forgotpassword`, { email, }).then((response) => {
      dispatch(authError(`Check your email to change your password! (expires in 10 minutes)`));
      // history.push('/signin');
    }).catch((error) => {
      dispatch(authError(`Check your email to change your password! (expires in 10 minutes)`));
      // history.push('/signin');
    });
  };
}

export function updatePassword({ token, password, } , history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/updatepassword`, { token, password, }).then((response) => {
      dispatch(authError(`Success: ${response.data}`));
      // history.push('/signin');
    }).catch((error) => {
      dispatch(authError(`Error: ${error.response.data}`));
      // history.push('/signin');
    });
  };
}

// Signup and email confirmation
export function sendConfirmationEmail({ 
  email, password, role, student_profile_id, startup_id, } , history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/emailconfirmation`, { email, password, role, student_profile_id, startup_id }).then((response) => {
      // dispatch(authError(`Check your email to signup! (expires in 1 hour)`));
      // dispatch({ type: ActionTypes.CONFIRM_EMAIL, payload: response.data });
      history.push('/emailconfirmation');
    }).catch((error) => {
      // dispatch(authError(`Check your email to signup! (expires in 1 hour)`));
      // dispatch(authError(error));
      history.push('/emailconfirmation');
    });
  };
}

export function confirmedSignup({ token, } , history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/confirmemail`, { token, }).then((response) => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.user.id);
      localStorage.setItem('role', response.data.user.role);
      // dispatch({ type: ActionTypes.AUTH_USER, userID: response.data.id });
      dispatch({ type: ActionTypes.FETCH_USER, payload: response.data.user });
      if (response.data.user.role === 'student') {
        history.push('/student-signup');
      } else if (response.data.user.role === 'startup') {
        history.push('/startup-signup');
      } else if (response.data.user.role === 'admin') { // likely not to reach here as no option to determine role of admin
        history.push('/posts');
      }
    }).catch((error) => {
      dispatch(authError(`Sign Up Failed: ${error}`));
    });
  };
}

// s3 routes
function getSignedRequest(id, file) {
  const fileName = encodeURIComponent(file.name);
  return axios.get(`${ROOT_URL}/sign-s3?file-name=${id}/${fileName}&file-type=${file.type}`);
}

function uploadFileToS3(signedRequest, file, url) {
  return new Promise((fulfill, reject) => {
    axios.put(signedRequest, file, { headers: { 'Content-Type': file.type } }).then((response) => {
      fulfill(url);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function uploadImage(id, file) {
  return getSignedRequest(id, file).then((response) => {
    return uploadFileToS3(response.data.signedRequest, file, response.data.url);
  });
}

export function emailExists({ email, }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/emailexists`, { email, }).then((response) => {
      dispatch(authError(response.data));
    }).catch((error) => {
      dispatch(authError(error.data));
    });
  };
}

// email notification routes
export function sendNotificationEmail({ 
  user_id, type, info, }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/emailnotification`, { user_id, type, info, }).then((response) => {
      // dispatch({ type: ActionTypes.CONFIRM_EMAIL, payload: response.data });
    }).catch((error) => {
      dispatch(authError(error));;
    });
  };
}
