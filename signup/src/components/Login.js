import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../actions';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <Formik
        initialValues={{ email: '', phoneNumber: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          phoneNumber: Yup.string().required('Required'),
        })}
        onSubmit={(values, { resetForm }) => {
          dispatch(loginAction(values, () => navigate('/welcome')));
          resetForm();
        }}
      >
        <Form>
          <label htmlFor="email">Email Address</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />

          <label htmlFor="phoneNumber">Password</label>
          <Field name="phoneNumber" type="password" />
          <ErrorMessage name="phoneNumber" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
