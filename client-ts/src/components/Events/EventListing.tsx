import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import layoutHoc from '../Common/Layout';
import EventItem from './EventItem';
import Loader from '../UI/Loader';
import ShowAlert from '../UI/ShowAlert';
import apis from '../../repositories/api';
import defaultErrorMessage from '../../utility/ErrorMessages';
import { isApiError } from '../../utility/CustomError';

interface IEvent {
  id: number;
  eventTitle: string;
  eventVenue?: {
    name: string;
  };
  eventDate: string;
  eventDesc?: string;
}

function EventListing() {
  const { venueId = '' } = useParams();
  const [events, setEvents] = useState([]);
  const [noEvents, setNoEvents] = useState(false);
  const [pageTitle, setPageTitle] = useState('Events Around You');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchEvents = async () => {
    setIsLoading(true); // Hide the Loader
    setNoEvents(false);
    try {
      let response;
      if (venueId !== '') {
        const venueDetails = await apis.getVenueById(venueId);
        setPageTitle(`Event At ${venueDetails.data.venue.name}`);
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
      let errMsg = defaultErrorMessage;
      if (isApiError(err)) {
        errMsg = err.response.data.message;
      }
      setError(errMsg);
    } finally {
      setIsLoading(false); // Hide the Loader
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [venueId]);

  const deleteEventHandler = (eventId: number) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure to delete this event?')) {
      (async () => {
        try {
          const newEvents = events.filter(
            (event: IEvent) => event.id !== eventId
          );
          setEvents([...newEvents]);

          await apis.deleteEvent(eventId);
        } catch (err) {
          let errMsg = defaultErrorMessage;
          if (isApiError(err)) {
            errMsg = err.response.data.message;
          }
          setError(errMsg);
        }
      })();
    }
  };

  return (
    <div className="container-fluid mt-0">
      <div className="d-flex justify-content-end pb-2">
        <Link to="/add-event" type="button" className="btn btn-primary">
          Add Event{' '}
        </Link>
      </div>
      <div className="row">
        <h3 className="card-title text-primary text-center pb-2">
          {pageTitle}
        </h3>
        <div className="col-md-6 offset-3 text-center">
          {isLoading && <Loader />}
          {error && (
            <ShowAlert className="danger" hideAlert={() => setError('')}>
              {error}
            </ShowAlert>
          )}
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {events.length > 0 &&
          events.map((event: IEvent) => (
            <EventItem
              key={event.id}
              event={event}
              onDelete={deleteEventHandler}
            />
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

export default layoutHoc(EventListing);
