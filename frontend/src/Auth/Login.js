/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/fontawesome-free-solid';
import { Link } from 'react-router-dom';
import CommonHoc from './CommonHoc';
import AuthContext from '../context/AuthProvider';

const apiURL = `${process.env.REACT_APP_API}/user/login`;
const defaultErrorMessage = 'Something went wrong';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setAuth } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
      axios
        .post(apiURL, {
          email,
          password
        })
        .then((response) => {
          const userInfo = JSON.stringify(response.data.user);
          localStorage.setItem('loggedIn', true);
          localStorage.setItem('user', userInfo);
          setAuth({ loggedIn: true, user: userInfo });
        }).catch((err) => {
          console.log(err);
          const errMsg = 'response' in err ? err.response.data.message : defaultErrorMessage;
          setError(errMsg);
        });
  };

  // useEffect(() => {
  //   console.log(auth);
  //   if ('loggedIn' in auth && auth.loggedIn === true) {
  //     navigate('/dashboard');
  //   }
  // }, []);

  return (
    <div>
      <p className="text-center h6 fw-bold mb-2">Create Account</p>
      <p className="text-center h6 fw-bold mb-3">
        Don’t have an account yet? 
        {' '}
        <Link to="/signup">Sign up</Link>
        {' '}
        here
      </p>
      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
        {error 
          && (
          <div className="alert alert-danger" role="alert">
            {error}
            <button type="button" className="btn-close float-end" data-bs-dismiss="alert" aria-label="Close" />
          </div>
          )}
        <div className="d-flex flex-row align-items-center mb-4">
          <FontAwesomeIcon icon={faEnvelope} className="me-3 fs-4" />
          <div className="form-outline flex-fill mb-0">
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)} 
              value={email}
              name="email"
              required
            />
            <label className="form-label d-none" htmlFor="email">
              Your Email
            </label>
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
              onChange={e => setPassword(e.target.value)} 
              value={password}
              name="password"
              required
            />
            <label className="form-label d-none" htmlFor="password">
              Password
            </label>
          </div>
        </div>

        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
          <button type="submit" className="btn btn-outline-primary ">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommonHoc(Login);
