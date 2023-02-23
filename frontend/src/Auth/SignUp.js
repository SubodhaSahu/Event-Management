import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faLock,
  faKey,
} from '@fortawesome/fontawesome-free-solid';
import { Link } from 'react-router-dom';
import CommonHoc from './CommonHoc';
import Loader from '../UI/Loader';
import ShowAlert from '../UI/ShowAlert';

const apiURL = `${process.env.REACT_APP_API}users`;
const defaultErrorMessage = 'Something went wrong';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Password and confirm password should be same');
      return;
    }
    setIsLoading(true); // Show the loader
    axios
      .post(apiURL, {
        name,
        email,
        password
      })
      .then((response) => {
        resetForm();
        setSuccessMsg(response.data.message || 'User Created Successfully');
      }).catch((err) => {
        const errMsg = 'response' in err ? err.response.data.message : defaultErrorMessage;
        setError(errMsg);
      }).finally(() => {
        setIsLoading(false); // Hide the Loader
      });
  };
  return (
    <div>
      <p className="text-center h6 fw-bold mb-2">Create Account</p>
      <p className="text-center h6 fw-bold mb-3">
        Already have an account? Then
        {' '}
        <Link to="/login" relative="path">
          Login
        </Link>
        {' '}
        here
      </p>

      {/* Show The Loader */}
      <div className="pb-2">
        {isLoading && <Loader /> }
      </div>
      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

        {/* Show The Success Message */}
        { successMsg && (
          <ShowAlert className="success">
            {successMsg}
          </ShowAlert>
        )}

        {/* Show The Error  Message */}
        { error && (
        <ShowAlert className="danger">
          {error}
        </ShowAlert>
        )}
        <div className="d-flex flex-row align-items-center mb-4">
          <FontAwesomeIcon icon={faUser} className="me-3 fs-4" />
          <div className="form-outline flex-fill mb-0">
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Name"
              value={name}
              required
              onChange={e => setName(e.target.value)} 
            />
          </div>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <FontAwesomeIcon icon={faEnvelope} className="me-3 fs-4" />
          <div className="form-outline flex-fill mb-0">
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email"
              value={email}
              required
              onChange={e => setEmail(e.target.value)} 
            />
          </div>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <FontAwesomeIcon icon={faLock} className="me-3 fs-4" />
          <div className="form-outline flex-fill mb-0">
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              required
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <FontAwesomeIcon icon={faKey} className="me-3 fs-4" />
          <div className="form-outline flex-fill mb-0">
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Repeat your password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)} 
              required
            />
          </div>
        </div>
        <div className="form-check d-flex justify-content-center mb-5">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            id="form2Example3c"
            required
          />
          <label className="form-check-label" htmlFor="form2Example3">
            I agree all statements in 
            {' '}
            <a href="#!">Terms of service</a>
          </label>
        </div>

        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
          <button type="submit" className="btn btn-outline-primary" disabled={isLoading}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommonHoc(Signup);
