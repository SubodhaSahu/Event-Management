// eslint no-underscore-dangle: 0
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import layoutHoc from '../Common/Layout';
import Loader from '../UI/Loader';
import apis from '../../repositories/api';
import ShowAlert from '../UI/ShowAlert';
import Theader from '../UI/Theader';

function Venue() {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apis.getVenue().then((response) => {
      setVenues(response.data.venues);
    });
  }, []);

  const deleteVenue = (venueId) => {
    if (
      // eslint-disable-next-line no-alert
      window.confirm(
        'Are you sure to delete this center? If you delete then you will lose all the event attaced to it'
      )
    ) {
      (async () => {
        try {
          await apis.deleteVenue(venueId);
          // window.reload();
        } catch (err) {
          setError(err);
        }
      })();
    }
  };

  // 👇️ Check if undefined or null
  if (venues === undefined || venues === null) {
    return <Loader />;
  }

  const columns = ['Name', 'Address', '#'];
  const venuesList =
    venues &&
    venues.length > 0 &&
    venues.map((venue) => (
      // eslint-disable-next-line no-param-reassign, no-underscore-dangle
      <tr key={venue._id}>
        <td>
          <Link
            // eslint-disable-next-line no-param-reassign, no-underscore-dangle
            to={`/center-by-event/${venue._id}`}
            type="btn"
            className="btn btn-link "
            title="Center By Venue"
          >
            {' '}
            {venue.name}
          </Link>
        </td>
        <td>
          {`${venue?.address?.street || ''}, 
                ${venue?.address?.city || ''}, 
                ${venue?.address?.state || ''},
                 ${venue?.address?.zip || ''}`}
        </td>
        <td>
          <Link
            // eslint-disable-next-line no-param-reassign, no-underscore-dangle
            to={`/edit-venue/${venue._id}`}
            type="btn"
            className="btn btn-link "
            title="Edit Venue"
          >
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <button
            type="button"
            // eslint-disable-next-line no-param-reassign, no-underscore-dangle
            onClick={() => deleteVenue(venue._id)}
            className="btn btn-icon"
          >
            <FontAwesomeIcon
              icon={faTrash}
              className="text-secondary fw-lighter fs-6 "
            />
          </button>
        </td>
      </tr>
    ));

  return (
    <div className="container-fluid mt-0">
      <div className="d-flex justify-content-end pb-2">
        <Link to="/add-venue" type="button" className="btn btn-primary">
          Add Event Center{' '}
        </Link>
      </div>
      <div className="row">
        {error && (
          <ShowAlert className="danger" closeAlert={() => setError('')}>
            {error}
          </ShowAlert>
        )}
        <div className="card mb-4 box-shadow rounded bg-light">
          <div className="card-header bg-light">
            <h5 className="card-title mb-0 text-center">Event Centers</h5>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-striped table-hover">
              <Theader columns={columns} />
              <tbody>{venuesList}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default layoutHoc(Venue);
