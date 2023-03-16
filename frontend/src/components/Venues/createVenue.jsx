import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardHoc from '../LayoutHoc/DashboardHoc';
import apis from '../../repositories/api';

function CreateVenue() {
  const { id = '' } = useParams(); 

  const [name, setName] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    zip: ''
  });
  
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getVenueDetails = async () => {
    try {
      const response = await apis.getVenueById(id);   
      console.log(response);
      const {
        address: addr, name: venueName
      } = response.data.venue;
      setName(venueName);
      setAddress(prevState => ({ ...prevState, ...addr }));
    } catch (err) {
      setError(err);
    }
  };

  const handleAddressChange = e => {
    const { name: fieldName, value } = e.target;
    setAddress(prevState => ({
        ...prevState,
        [fieldName]: value
    }));
};

  useEffect(() => {
    // Get the data in order to populate while editing
    if (id !== '') {
      console.log('Hello');
      getVenueDetails(id);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      const venueDetails = {
        name,
        address
      };
      try {
        let response = '';

        // Call Put method for Update and Post for add
        if (id !== '') {
          response = await apis.putVenue(id, venueDetails);
        } else {
          response = await apis.postVenue(venueDetails);
        }
        if (response) {
          navigate('/venues');
        }
      } catch (err) {
          setError(err);
      }
    })();
  };
  if (error) return `Error: ${error.message}`;
  
    return (
      <div
        className="container-fluid mt-0"
        style={{ minHeight: '100%', height: '100%' }}
      >
        <div className="col align-items-stretch">
          <div className="card h-100">
            <div className="card-title p-3">
              <span className="text-center">Add Event center </span>
              <a href="/venues" className="btn btn-primary float-end">Go Back</a>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row  mx-2 my-3">
                  <div className="col-md-1">Name</div>
                  <div className="col-md-6 form-outline mb-0">
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      aria-describedby="Name"
                      placeholder="Name"
                      name="name" 
                      onChange={e => setName(e.target.value)} 
                      value={name}
                      required
                    />
                  </div>
                </div>
                <div className="row  mx-2 my-3">
                  <div className="col-md-1">Street</div>
                  <div className="col-md-6 form-outline mb-0">
                    <input
                      type="text"
                      id="street"
                      className="form-control"
                      aria-describedby="street"
                      placeholder="street"
                      name="street" 
                      onChange={handleAddressChange} 
                      value={address.street}
                      required
                    />
                  </div>
                </div>
                <div className="row  mx-2 my-3">
                  <div className="col-md-1">City</div>
                  <div className="col-md-6 form-outline mb-0">
                    <input
                      type="text"
                      id="city"
                      className="form-control"
                      aria-describedby="street"
                      placeholder="City"
                      name="city" 
                      onChange={handleAddressChange} 
                      value={address.city}
                      required
                    />
                  </div>
                </div>
                <div className="row  mx-2 my-3">
                  <div className="col-md-1">State</div>
                  <div className="col-md-6 form-outline mb-0">
                    <input
                      type="text"
                      id="state"
                      className="form-control"
                      aria-describedby="state"
                      placeholder="State"
                      name="state" 
                      onChange={handleAddressChange} 
                      value={address.state}
                      required
                    />
                  </div>
                </div>
                <div className="row  mx-2 my-3">
                  <div className="col-md-1">Country</div>
                  <div className="col-md-6 form-outline mb-0">
                    <input
                      type="text"
                      id="country"
                      className="form-control"
                      aria-describedby="country"
                      placeholder="Country"
                      name="country" 
                      onChange={handleAddressChange} 
                      value={address.country}
                      required
                    />
                  </div>
                </div>
                <div className="row  mx-2 my-3">
                  <div className="col-md-1">Zip</div>
                  <div className="col-md-6 form-outline mb-0">
                    <input
                      type="text"
                      id="zip"
                      className="form-control"
                      aria-describedby="Zip or Pin Code"
                      placeholder="Zip / Pin Code"
                      name="zip" 
                      onChange={handleAddressChange} 
                      value={address.zip}
                      required
                    />
                  </div>
                </div>
                <div className="row  mx-2 my-3">
                  <div className="col-md-6 offset-3 form-outline mb-0">
                    <button type="button" className="btn btn-secondary">Reset</button>
                    {' '}
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form>
            </div>  
          </div>
        </div>
      </div>
    );
}

export default DashboardHoc(CreateVenue);
