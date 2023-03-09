import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardHoc from '../LayoutHoc/DashboardHoc';
import EventItem from './EventItem';
import Loader from '../../UI/Loader';
import apis from '../../repositories/api';

function EventListing() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    apis.getEvents().then((response) => {
      setEvents(response.data.events);
    });
  }, []);

  // 👇️ Check if undefined or null
  if (events === undefined || events === null) {
    return <Loader />;
  }

  // const marginTop = { marginTop: '-3%' };
  
  return (
    <div className="container-fluid mt-0">
      <div className="d-flex justify-content-end pb-2">
        <Link to="/add-event" type="button" className="btn btn-primary">Add Event </Link>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {events && events.length > 0
                  ? events.map((event) => (
                    <EventItem event={event} key={event.id} />
                    ))
                  : (
                    <div className="alert alert-danger text-center">No Event Found</div>
                  )}
      </div>
    </div>
  );
}

export default DashboardHoc(EventListing);
