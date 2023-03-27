import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarker,
  faClock,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ShowAlert from '../UI/ShowAlert';
// import apis from '../../repositories/api';

type props = {
  event: {
    id: number;
    eventTitle: string;
    eventVenue?: {
      name: string;
    };
    eventDate: string;
    eventDesc?: string;
  };
  onDelete: (id: number) => void;
};

function EventItem({ event, onDelete }: props) {
  const [error, setError] = useState('');

  // const deleteEvent = (eventId) => {
  //   // eslint-disable-next-line no-alert
  //   if (window.confirm('Are you sure to delete this event?')) {
  //     (async () => {
  //       try {
  //         await apis.deleteEvent(eventId);
  //         window.reload();
  //       } catch (err) {
  //         setError(err);
  //       }
  //     })();
  //   }
  // };
  return (
    <div className="col align-items-stretch" key={event.id}>
      {error && (
        <ShowAlert className="danger" hideAlert={() => setError('')}>
          {error}
        </ShowAlert>
      )}
      <div
        className="card mb-4 box-shadow rounded"
        style={{ boxShadow: '0 0 0.875rem 0 rgb(33 37 41 / 5%' }}
      >
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-primary">
            {event?.eventTitle.substring(0, 30)}
          </h5>

          <p className="card-subtitle mt-3 mb-2 fw-lighter fs-6">
            <FontAwesomeIcon icon={faMapMarker} /> {event?.eventVenue?.name}
          </p>
          <p className="card-subtitle mt-3 mb-2 text-success fs-6">
            {' '}
            <FontAwesomeIcon icon={faClock} /> {event?.eventDate}
          </p>
          <p className="card-text my-5">
            {event?.eventDesc?.substring(0, 150)}
          </p>
          <div className="row">
            <div className="col-md-8 col-lg-8 col-sm-12 text-middle">
              <Link
                to={`/edit-event/${event.id}`}
                type="btn"
                className="btn btn-outline-primary "
              >
                Edit Event
              </Link>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12 text-end">
              <button
                type="button"
                onClick={() => onDelete(event.id)}
                className="btn btn-icon"
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-secondary fw-lighter fs-6 "
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventItem;
