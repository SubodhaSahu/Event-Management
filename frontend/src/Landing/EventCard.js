import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faClock } from '@fortawesome/fontawesome-free-solid';

function EventCard({ event }) {
    return (
      <div className="col align-items-stretch">
        <div
          className="card mb-4 box-shadow rounded"
          style={{ maxHeight: '60vh', minHeight: '60vh' }}
        >
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-primary">{event.eventTitle.substring(0, 30)}</h5>
        
            <p className="card-subtitle mt-3 mb-2 fw-lighter fs-6">
              <FontAwesomeIcon icon={faMapMarker} /> 
              {' '}
              {event.eventVenue.name} 
            </p>
            <p className="card-subtitle mt-3 mb-2 text-success fs-6"> 
              {' '}
              <FontAwesomeIcon icon={faClock} /> 
              {' '}
              {event.eventDate}
            </p>
            <p className="card-text my-5">{event.eventDesc.substring(0, 150)}</p>
            <a href={`edit-event/${event._id}`} className="btn btn-outline-success mt-auto align-self-middle">View More</a>
          </div>
        </div>
                    
      </div>
    );
}

export default EventCard;
