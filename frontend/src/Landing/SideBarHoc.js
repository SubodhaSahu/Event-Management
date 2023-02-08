/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

let userToken = localStorage.getItem('user');
userToken = JSON.parse(userToken);

const SideBarHoc = (HocComponent) => function hocFunction() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
      checkUserToken();
  }, [isLoggedIn]);

  return (
    <>
      {!isLoggedIn && (navigate('/login'))}
      <div className="container-fluid" style={{ backgroundColor: '#eee' }}>
   
        <div className="row flex-nowrap">
          <div
            className="col-auto col-md-3 col-xl-2 px-sm-2 px-0"
            style={{
          borderRight: '1px solid #cbd0dd',
          backgroundColor: '#FFFFFF',
        }}
          >
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a
                href="/"
                className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-black text-decoration-none"
              >
                <span className="fs-5 d-none d-sm-inline">
                  Event Management System
                </span>
              </a>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start list-group"
                id="menu"
              >
                <li className="nav-item">
                  <a href="/dashboard" className="nav-link align-middle px-0">
                    <i className="fs-4 bi-house" />
                    {' '}
                    <span className="ms-1 d-none d-sm-inline">Events</span>
                  </a>
                </li>
                <li>
                  <a href="/about-us" className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-speedometer2" />
                    {' '}
                    <span className="ms-1 d-none d-sm-inline">About Us</span>
                    {' '}
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" className="nav-link px-0 align-middle" aria-current="true">
                    <i className="fs-4 bi-speedometer2" />
                    {' '}
                    <span className="ms-1 d-none d-sm-inline">Privacy Policy</span>
                    {' '}
                  </a>
                </li>
              </ul>
              <hr />
              <div className="dropdown pb-4">
                <a
                  href="/profile"
                  className="d-flex align-items-center text-black text-decoration-none dropdown-toggle"
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
                    <a className="dropdown-item" href="logout">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col py-3">
            <HocComponent />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarHoc;
