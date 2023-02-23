import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';

const apiURL = `${process.env.REACT_APP_API}events`;

function EventTable() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    axios.get(apiURL).then((response) => {
      setEvents(response.data.events);
    });
  }, []);

  const marginTop = { marginTop: '-3%' };

  let eventCard = <div className="alert alert-danger text-center">No Event Found</div>;
  if (events && events.length > 0) {
    eventCard = events.map((event) => (
      <EventCard event={event} key={event._id} />
    ));
  }
  
  return (
    <div className="container-fluid mt-0">
      <div className="d-flex justify-content-end pb-2" style={marginTop}>
        <Link to="/add-event" type="button" className="btn btn-primary">Add Event </Link>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">{eventCard}</div>
    </div>
  );
}

export default EventTable;
