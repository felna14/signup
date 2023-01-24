import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  editStudentData,
  edittedStudentData,
  postStudentData,
} from '../actions';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ImageUploader from 'react-images-upload';
import { useDispatch, useSelector } from 'react-redux';

const AddForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [errorImage, setErrorImage] = useState('');
  const navigate = useNavigate();
  const { editStudent } = useSelector((state) => state.postReducer);
  console.log(editStudent);

  useEffect(() => {
    if (id) {
      dispatch(editStudentData(id));
    }
  }, []);

  const onDrop = (pictureFiles, pictureDataURLs) => {
    setImage(pictureDataURLs);
  };
  return (
    <div>
      <Formik
        initialValues={{
          Name: id ? editStudent.Name : '',
          email: id ? editStudent.email : '',
        }}
        validationSchema={Yup.object({
          Name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),

          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        })}
        onSubmit={(values, { resetForm }) => {
          if (image === '') {
            setErrorImage('Required');
          }
          if (id) {
            let img = image ? image : editStudent.image;
            dispatch(edittedStudentData({ ...values, image: img }, id));
            navigate('/welcome');
            resetForm();
          } else {
            values = { ...values, image };
            dispatch(postStudentData(values));
            navigate('/welcome');
            resetForm();
          }
        }}
        enableReinitialize
      >
        <Form>
          <div>
            <label htmlFor="Name">First Name</label>
            <Field name="Name" type="text" />
            <ErrorMessage name="Name" />
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
          </div>

          <div>
            {id ? (
              <img src={editStudent.image} style={{ height: '100px' }} />
            ) : null}
            <label>Photo</label>
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              onChange={onDrop}
              value={image}
              withPreview={true}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
            />
            <div>{errorImage}</div>
          </div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddForm;
