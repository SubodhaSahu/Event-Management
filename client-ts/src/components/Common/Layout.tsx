import { ComponentType } from 'react';
import TopNavBar from './TopNavBar';
import SideBarNav from './SideBarNav';
import Footer from './Footer';

const layoutHoc = (HocComponent: ComponentType) =>
  function hocFunction() {
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
            <SideBarNav />
          </div>
          <div className={`main  d-flex ${mainContentClass}`}>
            <TopNavBar />
            <main className="content overflow-auto main-body">
              <HocComponent />
            </main>
            <Footer />
          </div>
        </div>
      </div>
    );
  };

export default layoutHoc;
