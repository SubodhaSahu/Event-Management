/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faBars } from '@fortawesome/fontawesome-free-solid';
import Footer from './Footer';
import SideBarNav from './SideBarNav';
import TopNavBar from './TopNavBar';

const LandingPageHoc = (HocComponent) => function hocFunction() {
  const navigate = useNavigate();
  const [navtoggle, setNavtoggle] = useState(true);
  useEffect(() => {
   const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      // Do Nothing
    } else {
      navigate('/login');
    }
  }, []);

  const toggleMenu = () => {
    setNavtoggle(!navtoggle);
  };
  const sideBarClass = navtoggle ? 'col-lg-2 col-md-2' : 'col-lg-1 col-md-1';
  const mainContentClass = navtoggle ? 'col-lg-10 col-md-10' : 'col-lg-11 col-md-11';

  return (
    <div style={{ backgroundColor: '#eee' }}>
      <TopNavBar />
      <div className="row">
        <div className={`${sideBarClass}`}>
          <SideBarNav navtoggle={navtoggle} />
        </div>
        <div className={`my-container  ${mainContentClass}`}>
          <nav className="navbar top-navbar px-4 col-lg-1">
            <button type="button" className="btn border-0" id="menu-btn" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </nav>
          <HocComponent />
          <Footer />
        </div>
      </div>

      {/* <div className="row flex-nowrap">
        <SideBarNav navtoggle={navtoggle} />
        <div className={`p-1 my-container py-3 col-md-9 col-xl-10 ${navActiveClass}`}>
          <nav className="navbar top-navbar navbar-light bg-light px-5">
            <button type="button" className="btn border-0" id="menu-btn" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </nav>
          <HocComponent />
          <Footer />
        </div>
      </div> */}
    </div>
  );
};

export default LandingPageHoc;
