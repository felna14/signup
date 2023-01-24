import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStudentData, logout } from '../actions';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Welcome = () => {
  const dispatch = useDispatch();
  const { data} = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getStudentData());
  }, []);
  return (
    <div>
      Welcome
      <button>
        <Link to="/" onClick={() => dispatch(logout())}>
          LOGOUT
        </Link>
      </button>
      <div>
        <button>
          <Link to="/add-form">ADD</Link>
        </button>
      </div>
      <div className="container mt-5">
        {data.map((d) => (
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={d.image} />
            <Card.Body>
              <Card.Title>{d.Name}</Card.Title>
              {/* <Card.Text>{d.email}</Card.Text> */}
              <Button as={Link} to={`/view-form/${d.id}`} variant="primary">
            
                View
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Welcome;
