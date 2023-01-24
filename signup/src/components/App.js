import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';
import Welcome from './Welcome';
import PrivateRoute from './PrivateRoute';
import AddForm from './AddForm';
import ViewForm from './ViewForm';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/add-form" element={<AddForm />} />
          <Route path="/view-form/:id" element={<ViewForm />} />
          <Route path="/edit-form/:id" element={<AddForm />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
