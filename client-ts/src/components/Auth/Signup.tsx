import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faCheck,
  faTimes,
  faInfoCircle,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import apis from '../../repositories/api';
import Loader from '../UI/Loader';
import ShowAlert from '../UI/ShowAlert';
import { isApiError } from '../../utility/CustomError';
import '../../style/style.css';
import defaultErrorMessage from '../../utility/ErrorMessages';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;

function Signup() {
  const userRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  const resetForm = () => {
    setName(true);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Password and confirm password should be same');
      return;
    }
    setIsLoading(true); // Show the loader

    try {
      const response = await apis.signup({ name, email, password });
      resetForm();
      setSuccessMsg(response.data.message || 'User Created Successfully');
    } catch (err) {
      let errMsg = defaultErrorMessage;
      if (isApiError(err)) {
        errMsg = err.response.data.message;
      }
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p className="text-center h6 fw-bold mb-2">Create Account</p>
      <p className="text-center h6 fw-bold mb-3">
        Already have an account? Then{' '}
        <Link to="/login" relative="path">
          Login
        </Link>{' '}
        here
      </p>

      {/* Show The Loader */}
      <div className="pb-2">{isLoading && <Loader />}</div>
      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
        {/* Show The Success Message */}
        {successMsg && (
          <ShowAlert className="success" hideAlert={() => setSuccessMsg('')}>
            {successMsg}
          </ShowAlert>
        )}

        {/* Show The Error  Message */}
        {error && (
          <ShowAlert className="danger" hideAlert={() => setError('')}>
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
              ref={userRef}
              className="form-control"
              placeholder="Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <FontAwesomeIcon
            icon={faLock}
            className={!password ? 'me-3 fs-4' : 'hide'}
          />
          <FontAwesomeIcon
            icon={faCheck}
            className={validPwd ? 'me-3 fs-4 valid' : 'hide'}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validPwd || !password ? 'hide' : 'me-3 fs-4 invalid'}
          />
          <div className="form-outline flex-fill mb-0">
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              aria-describedby="pwdnote"
              required
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
          </div>
        </div>
        <div
          className={
            pwdFocus && !validPwd
              ? 'instructions align-items-center mb-4'
              : 'offscreen align-items-center mb-4'
          }
        >
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            6 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{' '}
            <span aria-label="exclamation mark">!</span>{' '}
            <span aria-label="at symbol">@</span>{' '}
            <span aria-label="hashtag">#</span>{' '}
            <span aria-label="dollar sign">$</span>{' '}
            <span aria-label="percent">%</span>
          </p>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <FontAwesomeIcon
            icon={faLock}
            className={!confirmPassword ? 'me-3 fs-4' : 'hide'}
          />
          <FontAwesomeIcon
            icon={faCheck}
            className={
              validMatch && confirmPassword ? 'valid me-3 fs-4' : 'hide'
            }
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={
              validMatch || !confirmPassword ? 'hide' : 'invalid me-3 fs-4'
            }
          />
          <div className="form-outline flex-fill mb-0">
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Repeat your password"
              name="confirmPassword"
              value={confirmPassword}
              aria-describedby="confirmnote"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
          </div>
        </div>
        <div
          className={
            matchFocus && !validMatch
              ? 'instructions align-items-center mb-4'
              : 'offscreen align-items-center mb-4'
          }
        >
          <p id="confirmnote">
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>
        </div>
        <div className="form-check d-flex justify-content-center mb-5">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            id="form2Example3c"
            required
          />
          <p className="form-check-label">
            I agree all statements in <a href="#!">Terms of service</a>
          </p>
        </div>

        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
          <button
            type="submit"
            className="btn btn-outline-primary"
            disabled={isLoading}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
