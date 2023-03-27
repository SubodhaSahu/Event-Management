import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faInfoCircle,
  faLock,
  faLocationArrow,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom';
import '../../style/style.css';
// import useAuth from '../../../hooks/useAuth';

function SideBarNav() {
  const location = useLocation();
  // const { userInfo } = useAuth();

  // destructuring pathname from location
  const { pathname } = location;

  // Javascript split method to get the name of the path in array
  const splitLocation = pathname.split('/');
  // const navActiveClass = navtoggle ? '' : 'd-none';

  // const userRole = 'User';
  return (
    <nav id="sidebar">
      <div className="d-flex justify-content-between flex-wrap flex-column h-100">
        <div className="sidebar-content align-items-center align-items-sm-start px-3 pt-5 text-white">
          <ul
            className="nav nav-pills nav-fill flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start list-group"
            id="menu"
          >
            <li className="nav-link">
              <NavLink
                to="/dashboard"
                className={`text-decoration-none ${
                  splitLocation[1] === 'dashboard' ? 'active-link' : ''
                }`}
              >
                <FontAwesomeIcon icon={faHome} />
                <span> Home </span>
              </NavLink>
            </li>
            {/* {userRole === 'Admin' && ( */}
            <li className="nav-link pt-3">
              <NavLink
                to="/venues"
                className={`text-decoration-none ${
                  splitLocation[1] === 'venues' ? 'active-link' : ''
                }`}
              >
                <FontAwesomeIcon icon={faLocationArrow} />
                <span> Event Center</span>
              </NavLink>
            </li>
            {/* )} */}
            <li className="nav-link pt-3">
              <NavLink
                to="/about-us"
                className={`text-decoration-none ${
                  splitLocation[1] === 'about-us' ? 'active-link' : ''
                }`}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                <span> About Us </span>
              </NavLink>
            </li>
            <li className="nav-link pt-3">
              <NavLink
                to="/privacy-policy"
                className={`text-decoration-none ${
                  splitLocation[1] === 'privacy-policy' ? 'active-link' : ''
                }`}
              >
                <FontAwesomeIcon icon={faLock} />
                <span> Privacy Policy </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default SideBarNav;
