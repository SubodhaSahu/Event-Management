import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apis from '../../repositories/api';
import DashboardHoc from '../LayoutHoc/DashboardHoc';
import EventItem from './EventItem';
import Loader from '../../UI/Loader';
import ShowAlert from '../../UI/ShowAlert';

function EventListing() {
  const [events, setEvents] = useState([]);
  const [noEvents, setNoEvents] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const defaultErrorMessage = 'Something went wrong';

  const fetchEvents = async () => {
    setIsLoading(true); // Hide the Loader
    try {
      const response = await apis.getEvents();
      setEvents(response.data.events);

      if (response.data.events.length === 0) {
        setNoEvents(true);
        setError('');
      }
    } catch (err) {
      const errMsg = 'response' in err ? err.response.data.message : defaultErrorMessage;
     // console.log(err);
      setError(errMsg);
    } finally {
      setIsLoading(false); // Hide the Loader
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  
  return (
    <div className="container-fluid mt-0">
      <div className="d-flex justify-content-end pb-2">
        <Link to="/add-event" type="button" className="btn btn-primary">Add Event </Link>
      </div>
      <div className="row">
        <div className="col-md-6 offset-3 text-center">
          {isLoading && <Loader /> }
          {error && (
          <ShowAlert className="danger" closeAlert={() => setError('')}>
            {error}
          </ShowAlert>
          )}
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {events.length > 0 && events.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
        
        {noEvents && (
          <div className="col-md-6 offset-3 text-center">
            <div className="alert alert-info text-center">No Event Found</div>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default DashboardHoc(EventListing);
