/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faLock,
  faKey,
} from '@fortawesome/fontawesome-free-solid';
import { Link } from 'react-router-dom';
import CommonHoc from './CommonHoc';

function Signup() {
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
      <form className="mx-1 mx-md-4">
        <div className="d-flex flex-row align-items-center mb-4">
          <FontAwesomeIcon icon={faUser} className="me-3 fs-4" />
          <div className="form-outline flex-fill mb-0">
            <input
              type="text"
              id="inputField"
              className="form-control"
              placeholder="Name"
            />
            <label className="formLabel d-none" htmlFor="inputField">
              Name
            </label>
          </div>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <FontAwesomeIcon icon={faEnvelope} className="me-3 fs-4" />
          <div className="form-outline flex-fill mb-0">
            <input
              type="email"
              id="form3Example3c"
              className="form-control"
              placeholder="Email"
            />
            <label className="form-label d-none" htmlFor="form3Example3c">
              Your Email
            </label>
          </div>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <FontAwesomeIcon icon={faLock} className="me-3 fs-4" />
          <div className="form-outline flex-fill mb-0">
            <input
              type="password"
              id="form3Example4c"
              className="form-control"
              placeholder="Password"
            />
            <label className="form-label d-none" htmlFor="form3Example4c">
              Password
            </label>
          </div>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <FontAwesomeIcon icon={faKey} className="me-3 fs-4" />
          <div className="form-outline flex-fill mb-0">
            <input
              type="password"
              id="form3Example4cd"
              className="form-control"
              placeholder="Repeat your password"
            />
            <label className="form-label d-none" htmlFor="form3Example4cd">
              Repeat your password
            </label>
          </div>
        </div>
        <div className="form-check d-flex justify-content-center mb-5">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            id="form2Example3c"
          />
          <label className="form-check-label" htmlFor="form2Example3">
            I agree all statements in 
            {' '}
            <a href="#!">Terms of service</a>
          </label>
        </div>

        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
          <button type="button" className="btn btn-outline-primary ">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommonHoc(Signup);
