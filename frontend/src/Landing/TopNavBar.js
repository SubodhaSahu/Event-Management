import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import '../style/style.css';

function TopNavBar() {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const logOut = () => {
        // eslint-disable-next-line no-undef
        localStorage.clear();
         setAuth({});
    };

    useEffect(() => {
        // eslint-disable-next-line no-undef
        const loggedIn = localStorage.getItem('loggedIn');
         if (loggedIn === 'true') {
           // Do Nothing
         } else {
           navigate('/login');
         }
      }, [auth]);
  
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light  top-nav">
          <div className="d-flex flex-grow-1">
            <span className="w-100 d-lg-none d-block" />
            <a className="navbar-brand d-none d-lg-inline-block py-0" href="/"> Event Management System</a>
            <a className="navbar-brand-two mx-auto d-lg-none d-inline-block py-0" href="/">
              <img src="//placehold.it/40?text=LOGO" alt="logo" />
            </a>
            <div className="w-100 text-right">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar">
                <span className="navbar-toggler-icon" />
              </button>
            </div>
          </div>
          <div className="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
            <ul className="navbar-nav ms-auto flex-nowrap">
              <div className="dropdown bottom-0 end-0">
                <a
                  href="/profile"
                  className="d-flex align-items-center text-black text-decoration-none dropdown-toggle py-0"
                  id="dropdownUser1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="hugenerd"
                    width="30"
                    height="30"
                    className="rounded-circle"
                  />
                  <span className="d-none d-sm-inline mx-1">Subodha Sahu</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                  <li>
                    <a className="dropdown-item" href="profile">
                      Profile
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button type="button" className="dropdown-item" onClick={logOut}>
                      Sign out
                    </button>
                  </li>
                  <li>&nbsp;</li>
                </ul>
              </div>
            </ul>
          </div>
        </nav>
      </div>
    );
}

export default TopNavBar;
