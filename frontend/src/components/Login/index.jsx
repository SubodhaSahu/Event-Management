import React, {
 useState, useRef, useEffect 
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/fontawesome-free-solid';
import { Link, useNavigate } from 'react-router-dom';
import CommonHoc from '../LayoutHoc/CommonHoc';
import Loader from '../../UI/Loader';
import apis from '../../repositories/api';
import ShowAlert from '../../UI/ShowAlert';
import useAuth from '../../hooks/useAuth';

const defaultErrorMessage = 'Something went wrong';

function Login() {
  const userRef = useRef();
  const { onLoginSetAuth } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // TO disable reloading the page
    setIsLoading(true); // Show the loader

    try {
      const response = await apis.login({ email, password });
      const { userInfo } = response.data;

      // Set Token and Refresh token in the local storage
      const token = response.data.token || '';
      const refreshToken = response.data.refreshToken || '';
      userInfo.token = token;
      userInfo.refreshToken = refreshToken;
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
      if (onLoginSetAuth(JSON.stringify(userInfo))) {
        navigate('/dashboard');
        window.location.reload(); // For first attempt it's unable to read from local storage
      }
    } catch (err) {
      const errMsg = 'response' in err ? err.response.data.message : defaultErrorMessage;
      setError(errMsg);
    } finally {
      setIsLoading(false); // Hide the Loader
    }
};

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
      <div className="pb-2">
        {isLoading && <Loader /> }
      </div>
      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
        {error && (
          <ShowAlert className="danger" closeAlert={() => setError('')}>
              {error}
          </ShowAlert>
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
              ref={userRef}
              name="email"
              required
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
              onChange={e => setPassword(e.target.value)} 
              value={password}
              name="password"
              required
            />
          </div>
        </div>

        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
          <button type="submit" className="btn btn-outline-primary" disabled={isLoading}>
            Login
          </button>
        </div>
      
      </form>
    </div>
  );
}

export default CommonHoc(Login);
