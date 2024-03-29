import { ReactElement } from 'react';
import Footer from './Footer';

type Props = {
  children: ReactElement;
};
function Header({ children }: Props) {
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-11 pt-5">
              <div className="card text-black" style={{ borderRadius: '25px' }}>
                <div className="card-body">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h4 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-primary">
                        Event Management System
                      </p>
                      <div>{children}</div>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"
                        className="img-fluid"
                        alt="Event Management System"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Header;
