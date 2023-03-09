import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/fontawesome-free-solid';
import { Link } from 'react-router-dom';
import DashboardHoc from '../LayoutHoc/DashboardHoc';
import Loader from '../../UI/Loader';
import Theader from '../../UI/Theader';
import ShowAlert from '../../UI/ShowAlert';
import apis from '../../repositories/api';

function Venue() {
    const [venues, setVenues] = useState(null);

    useEffect(() => {
      apis.getVenue().then((response) => {
        setVenues(response.data.venues);
      });
    }, []);
  
    // 👇️ Check if undefined or null
    if (venues === undefined || venues === null) {
      return <Loader />;
    }
    const columns = ['Name', 'Address', '#'];
    const venuesList = (venues && venues.length > 0
            ? venues.map((venue) => (
              <tr key={venue._id}>
                <td>{venue.name}</td>
                <td>
                  {`${venue.address.street || ' '}, 
                ${venue.address.city || ''}, 
                ${venue.address.state || ''},
                 ${venue.address.zip || ''}`}
                </td>
                <td>
                  <button type="button" className="btn btn-link">
                    {' '}
                    <FontAwesomeIcon icon={faEdit} />
                    {' '}
                  </button>
                </td>
              </tr>
            )) : (
              <ShowAlert className="danger">No Venues Found</ShowAlert>
            ));

    return (
      <div className="container-fluid mt-0">
        <div className="d-flex justify-content-end pb-2">
          <Link to="/add-venue" type="button" className="btn btn-primary">Add Venue </Link>
        </div>
        <div className="row">
          <div className="card mb-4 box-shadow rounded bg-light">
            <div className="card-header bg-light">
              <h5 className="card-title mb-0">Venues</h5>
            </div>
            <div className="card-body">
              <table className="table table-bordered table-striped table-hover">
                <Theader columns={columns} />
                <tbody>
                  {venuesList}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
}

export default DashboardHoc(Venue);
