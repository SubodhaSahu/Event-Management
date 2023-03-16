/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
 faHome, faInfoCircle, faLock, faLocationArrow 
} from '@fortawesome/fontawesome-free-solid';
import '../../../style/style.css';
import { NavLink, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

function SideBarNav({ navtoggle }) {
  const location = useLocation();
  const { userInfo } = useAuth();
  
  // destructuring pathname from location
  const { pathname } = location;

    // Javascript split method to get the name of the path in array
  const splitLocation = pathname.split('/');
  const navActiveClass = navtoggle ? '' : 'd-none';

  const userRole = userInfo.role || 'User';
  return (
    <nav id="sidebar">
      <div className="d-flex justify-content-between flex-wrap flex-column h-100">
        <div className="sidebar-content align-items-center align-items-sm-start px-3 pt-5 text-white">
          <ul
            className="nav nav-pills nav-fill flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start list-group"
            id="menu"
          >
            <li className="nav-link">
              <NavLink to="/dashboard" className={`text-decoration-none ${splitLocation[1] === 'dashboard' ? 'active-link' : ''}`}> 
                <FontAwesomeIcon icon={faHome} />
                <span className={`${navActiveClass}`}> Home </span>
              </NavLink>
            </li>
            {userRole === 'Admin' && (
              <li className="nav-link pt-3">
                <NavLink to="/venues" className={`text-decoration-none ${splitLocation[1] === 'venues' ? 'active-link' : ''}`}>
                  <FontAwesomeIcon icon={faLocationArrow} /> 
                  <span className={`${navActiveClass}`}> Event Center</span>
                </NavLink>
              </li>
            )}
            <li className="nav-link pt-3">
              <NavLink to="/about-us" className={`text-decoration-none ${splitLocation[1] === 'about-us' ? 'active-link' : ''}`}>
                <FontAwesomeIcon icon={faInfoCircle} /> 
                <span className={`${navActiveClass}`}> About Us </span>
              </NavLink>
            </li>
            <li className="nav-link pt-3">
              <NavLink to="/privacy-policy" className={`text-decoration-none ${splitLocation[1] === 'privacy-policy' ? 'active-link' : ''}`}>
                <FontAwesomeIcon icon={faLock} /> 
                <span className={`${navActiveClass}`}> Privacy Policy </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default SideBarNav;
