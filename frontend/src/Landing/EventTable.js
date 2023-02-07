/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faClock } from '@fortawesome/fontawesome-free-solid';

// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const apiURL = `${process.env.REACT_APP_API}event`;

function EventTable() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    axios.get(apiURL).then((response) => {
      setEvents(response.data);
    });
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-title p-3">
          <h1 className="text-center">
            Events around you
          </h1>
          <a href="add-event" className="btn btn-primary float-end">Add Events</a>
        </div>
        <div className="card-body">
          <div className="row">
            {events
              && events.map((event) => (
                <div key={event.id} className="col-lg-4 mb-3 d-flex align-items-stretch">
                  <div className="card mb-4 box-shadow rounded">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-primary">{event.eventTitle.substring(0, 30)}</h5>
                      <span className="card-subtitle mt-3 mb-2 fw-lighter fs-6">
                        <FontAwesomeIcon icon={faMapMarker} /> 
                        {' '}
                        {event.eventVenue}
                      </span>
                      <p className="card-subtitle mt-3 mb-2 text-success fs-6"> 
                        {' '}
                        <FontAwesomeIcon icon={faClock} /> 
                        {' '}
                        {event.eventDate}
                      </p>

                      <p className="card-text my-5">{event.eventDesc.substring(0, 150)}</p>
                      <a href="event/id" className="btn btn-outline-success mt-auto align-self-middle">View More</a>
                    </div>
                  </div>
                    
                </div>
                ))}
          </div>
        </div>  
      </div>
    </div>
  );
}

export default EventTable;
