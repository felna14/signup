import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { deleteStudentData, getStudentData, viewStudentData } from '../actions';
import { Link } from 'react-router-dom';

const ViewForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { viewStudent } = useSelector((state) => state.postReducer);
  //   console.log(viewStudent);

  useEffect(() => {
    if (id) {
      dispatch(viewStudentData(id));
    }
  }, []);

  return (
    <>
    {viewStudent !== null ? (
    <div>
     
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={viewStudent.image} />
          <Card.Body>
            <Card.Title>{viewStudent.Name}</Card.Title>
            <Card.Text>{viewStudent.email}</Card.Text>
            <Button
              variant="primary"
              as={Link}
              to={`/edit-form/${viewStudent.id}`}
            >
              Edit
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                dispatch(deleteStudentData(viewStudent.id));
                dispatch(getStudentData());
              }}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
    
    </div>
    ) : null}
    </>
  );
};

export default ViewForm;
