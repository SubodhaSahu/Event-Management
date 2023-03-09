import React from 'react';
  
import TopNavBar from './Common/TopNavBar';
import Footer from './Common/Footer';
import SideBarNav from './Common/SideBarNav';

const DashboardHoc = (HocComponent) => function hocFunction() {
  const navtoggle = true;
 
//   const toggleMenu = () => {
//     setNavtoggle(!navtoggle);
//   };
  
  const sideBarClass = navtoggle ? 'col-2' : 'col-lg-1 col-md-1';
  const mainContentClass = navtoggle ? 'col-10' : 'col-lg-11 col-md-11';

  return (
    <div style={{ backgroundColor: '#eee' }}>
      <div className="row gx-0">
        <div className={`sidebar ${sideBarClass}`}>
          <SideBarNav navtoggle={navtoggle} />
        </div>
        <div className={`main  d-flex ${mainContentClass}`}> 
          <TopNavBar />
          <main
            className="content overflow-auto main-body"
          >
            <HocComponent />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardHoc;
