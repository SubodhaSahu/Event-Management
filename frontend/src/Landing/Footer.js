import React from 'react';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
      <div>
        <footer className="footer py-top-30">
          <div className="container-fluid text-center">
            <div className="row">
              <div className="col align-self-center">
                <span className="text-muted text-bold text-center my-5">
                  Copyright ©
                  <b>{currentYear}</b>
                  {' '}
                  Event Management CC..
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
}

export default Footer;
