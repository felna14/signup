import {
  getData,
  postData,
  encrpyt,
  validatePassword,
  editData,
  deleteData,
} from '../service';

export const SignUpAction = (credentials, navigate) => async (dispatch) => {
  const { data } = await getData('users');
  const user = data.find((d) => d.email === credentials.email);
  if (user) {
    alert('user exits');
  } else {
    let { phoneNumber, ...restValues } = credentials;
    phoneNumber = encrpyt(phoneNumber);
    restValues = { ...restValues, phoneNumber };
    await postData('users', restValues);
    navigate();
  }
};

export const loginAction = (credentials, navigate) => async (dispatch) => {
  const { data } = await getData('users');
  const user = data.find((d) => d.email === credentials.email);
  if (!user) {
    alert('user doesnt exits');
  } else {
    if (validatePassword(user.phoneNumber, credentials.phoneNumber)) {
      sessionStorage.setItem(
        'user',
        JSON.stringify({ user: user.email, status: true })
      );
      dispatch({ type: 'LOGIN', payload: { user: user.email, status: true } });
      navigate();
    }
  }
};

export const logout = () => async (dispatch) => {
  await sessionStorage.removeItem('user');
  dispatch({ type: 'LOGIN', payload: null });
};

export const getStudentData = () => async (dispatch) => {
  const { data } = await getData('student');
  dispatch({
    type: 'STUDENT_DATA',
    payload: data,
  });
};

export const postStudentData = (data) => async (dispatch) => {
  await postData('student', data);
  dispatch(getStudentData());
};

export const viewStudentData = (id) => async (dispatch) => {
  const { data } = await getData(`student/${id}`);
  dispatch({
    type: 'VIEW_STUDENT_DATA',
    payload: data,
  });
};

export const editStudentData = (id) => async (dispatch) => {
  const { data } = await getData(`student/${id}`);
  console.log(data);
  dispatch({
    type: 'EDIT_STUDENT_DATA',
    payload: data,
  });
};

export const edittedStudentData = (data, id) => async (dispatch) => {
  await editData(`student/${id}`, data);
  dispatch(getStudentData());
};

export const deleteStudentData = (id) => async (dispatch) => {
  await deleteData(`student/${id}`);
  dispatch(getStudentData());
};
