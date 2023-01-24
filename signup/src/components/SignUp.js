import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { SignUpAction } from '../actions';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          phoneNumber: Yup.string().required('Required'),
        })}
        onSubmit={(values, { resetForm }) => {
        //   console.log('cli');
          dispatch(SignUpAction(values, () => navigate('/login')));
          resetForm();
        }}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" type="text" />
          <ErrorMessage name="firstName" />

          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" type="text" />
          <ErrorMessage name="lastName" />

          <label htmlFor="email">Email Address</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />

          <label htmlFor="phoneNumber">Phone</label>
          <Field name="phoneNumber" type="text" />
          <ErrorMessage name="phoneNumber" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
