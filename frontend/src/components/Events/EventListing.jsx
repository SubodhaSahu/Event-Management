import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DashboardHoc from '../LayoutHoc/DashboardHoc';
import EventItem from './EventItem';
import Loader from '../../UI/Loader';
import ShowAlert from '../../UI/ShowAlert';
import apis from '../../repositories/api';

function EventListing() {
  const { venueId = '' } = useParams();
  const [events, setEvents] = useState([]);
  const [noEvents, setNoEvents] = useState(false);
  const [pageTitle, setPageTitle] = useState('Events Around You');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const defaultErrorMessage = 'Something went wrong';

  const fetchEvents = async () => {
    setIsLoading(true); // Hide the Loader
    setNoEvents(false);
    try {
      let response = '';
      if (venueId !== '') {
        setPageTitle(`Event At ${venueId}`);
        response = await apis.getEventsByVenue(venueId);
      } else {
         response = await apis.getEvents();
      }

      if (response.data.events.length === 0) {
        setNoEvents(true);
        setError('');
      }
      setEvents(response.data.events);
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
  }, [venueId]);

  const deleteEventHandler = (eventId) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure to delete this event?')) {
      (async () => {
        try {
          const newEvents = events.filter(event => event.id !== eventId);
          setEvents([...newEvents]);

         await apis.deleteEvent(eventId);
        } catch (err) {
          setError(err);
        }
      })();
    }
  };
  
  return (
    <div className="container-fluid mt-0">
      <div className="d-flex justify-content-end pb-2">
        <Link to="/add-event" type="button" className="btn btn-primary">Add Event </Link>
      </div>
      <div className="row">
        <h3 className="card-title text-primary text-center pb-2">{pageTitle}</h3>
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
          <EventItem key={event.id} event={event} onDelete={deleteEventHandler} />
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
