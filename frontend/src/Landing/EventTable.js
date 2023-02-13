/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';

const apiURL = `${process.env.REACT_APP_API}event`;

function EventTable() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    axios.get(apiURL).then((response) => {
      setEvents(response.data.events);
    });
  }, []);

  const marginTop = { marginTop: '-3%' };

  return (
    <div className="container-fluid mt-0">
      <div className="d-flex justify-content-end pb-2" style={marginTop}>
        <Link to="/add-event" type="button" className="btn btn-primary">Add Event </Link>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {events
          && events.map((event) => (
            <EventCard event={event} key={event._id} />
          ))}  
      </div>
      {events
        && (
        <div className="d-flex justify-content-center">
          <nav aria-label="Page navigation">
            <ul className="pagination pagination-lg">
              <li className="page-item">
                <a className="page-link" href="/" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item"><a className="page-link" href="/">1</a></li>
              <li className="page-item"><a className="page-link" href="/">2</a></li>
              <li className="page-item"><a className="page-link" href="/">3</a></li>
              <li className="page-item">
                <a className="page-link" href="/" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
)}
      {/* <div className="card">
        <div className="card-title">
          <p className="text-center">
            Events around you
          </p>
          <a href="add-event" className="btn btn-primary float-end">Add Events</a>
        </div>
        <div className="card-body">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {events
              && events.map((event) => (
                <EventCard event={event} key={event._id} /> 
                ))}
          </div>
        </div>  
      </div> */}
    </div>
  );
}

export default EventTable;
