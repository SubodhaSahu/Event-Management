import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/fontawesome-free-solid';
import '../../../style/style.css';
import useAuth from '../../../hooks/useAuth';

function TopNavBar() {
  const { onLogout, userInfo } = useAuth();
  const navigate = useNavigate();
  const loggedUserName = userInfo.name || 'Guest User';

  const logOut = () => {
      onLogout();
      navigate('/login');
  };

  const toggleMenu = () => {
    // The toggle feature will be implemented here
    // console.log('Hello');
  };
  
    return (
      <nav className="navbar navbar-expand-lg navbar-light navbar-bg top-nav">
        <button type="button" className="btn border-0" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="d-flex flex-grow-1">
          {/* <span className="w-100 d-lg-none d-block" />
          <a className="navbar-brand d-none d-lg-inline-block py-0" href="/"> 
          Event Management System</a>
          <a className="navbar-brand-two mx-auto d-lg-none d-inline-block py-0" href="/">
            <img src="//placehold.it/40?text=LOGO" alt="logo" />
          </a> */}
        </div>
        <div className="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
          <ul className="navbar-nav ms-auto flex-nowrap">
            <li>
              <div className="dropdown bottom-0 end-0">
                <a
                  href="/profile"
                  className="d-flex align-items-center text-black text-decoration-none dropdown-toggle py-0"
                  id="dropdownUser1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ paddingRight: '1rem' }}
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="hugenerd"
                    width="30"
                    height="30"
                    className="rounded-circle"
                  />
                  <span className="d-none d-sm-inline mx-1">{loggedUserName}</span>
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
            </li>
          </ul>
        </div>
      </nav>
    );
}

export default TopNavBar;
