import { combineReducers } from 'redux';

const dummy = () => '';

const initial = {
  userLoggedIn: JSON.parse(sessionStorage.getItem('user')),
  data: [],
  viewStudent: {},
  editStudent: {},
};

const postReducer = (state = initial, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, userLoggedIn: action.payload };
    case 'STUDENT_DATA':
      return { ...state, data: action.payload };
    case 'VIEW_STUDENT_DATA':
      return { ...state, viewStudent: action.payload };
    case 'EDIT_STUDENT_DATA':
      return { ...state, editStudent: action.payload };
    default:
      return state;
  }
};
export default combineReducers({ dummy, postReducer });
