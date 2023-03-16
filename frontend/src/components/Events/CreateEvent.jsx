import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardHoc from '../LayoutHoc/DashboardHoc';
import apis from '../../repositories/api';
import ShowAlert from '../../UI/ShowAlert';

function CreateEvent() {
  const { id = 0 } = useParams();

  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventDate, setEventDate] = useState('');

  const [eventVenue, setEventVenue] = useState('');
  const [venues, setVenues] = useState([]);

  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const pageTitle = id > 0 ? 'Edit Event' : 'Add Event';

  const getEventDetails = async (eventId) => {
    try {
      const response = await apis.getEventById(eventId);
      const {
        eventTitle: title, eventDesc: desc,
        eventDate: date, eventVenue: venue,
      } = response.data.events;
      setEventTitle(title);
      setEventDesc(desc);
      setEventDate(date);
      setEventVenue(venue?._id);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    // Get the data in order to populate while editing
    if (id > 0) {
      getEventDetails(id);
    }
  }, [id]);

  // Get The Venue List to populate in the form dropdown
  useEffect(() => {
    (async () => {
      try {
        const response = await apis.getVenue();
        const { venues: venueList } = response.data;
        setVenues(venueList);
      } catch (err) {
        setError(err);
      }
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    (async () => {
      const eventDetails = {
        eventTitle,
        eventDesc,
        eventDate,
        eventVenue
      };
      try {
        let response = '';

        // Call Put method for Update and Post for add
        if (id > 0) {
          response = await apis.putEvents(id, eventDetails);
        } else {
          response = await apis.postEvents(eventDetails);
        }
        if (response) {
          navigate('/dashboard');
        }
      } catch (err) {
          setError(err);
      }
    })();
  };

  if (error) {
    return (
      <ShowAlert className="danger" closeAlert={() => setError('')}>
        {error.message || 'Please reload and try again'}
      </ShowAlert>
    );
  }
  
    return (
      <div
        className="container-fluid mt-0"
        style={{ minHeight: '100%', height: '100%' }}
      >
        <div className="col align-items-stretch">
          <div className="card h-100">
            <div className="card-title p-3">
              <span className="text-center"> 
                {' '}
                {pageTitle }
                {' '}
              </span>
              <a href="/dashboard" className="btn btn-primary float-end">Go Back</a>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row  mx-2 my-3">
                  <div className="col-md-2 text-center">Title</div>
                  <div className="col-md-6 form-outline mb-0">
                    <input
                      type="text"
                      id="eventTitle"
                      className="form-control"
                      aria-describedby="Event Title"
                      placeholder="Event Title"
                      name="eventTitle" 
                      onChange={e => setEventTitle(e.target.value)} 
                      value={eventTitle}
                      required
                    />
                  </div>
                </div>
                <div className="row  mx-2 my-3">
                  <div className="col-md-2 text-center"> Description</div>
                  <div className="col-md-6 form-outline mb-0">
                    <textarea
                      className="form-control"
                      placeholder="Event Description"
                      id="eventDesc"
                      name="eventDesc" 
                      onChange={e => setEventDesc(e.target.value)} 
                      value={eventDesc}
                      required
                    />
                  </div>
                </div>
                <div className="row  mx-2 my-3">
                  <div className="col-md-2 text-center">Date</div>
                  <div className="col-md-6 form-outline mb-0">
                    
                    <input
                      type="text"
                      id="eventDate"
                      className="form-control"
                      aria-describedby="Event Date"
                      placeholder="Event Date"
                      name="eventDate" 
                      onChange={e => setEventDate(e.target.value)} 
                      value={eventDate}
                      required
                    />
                  </div>
                </div>
                <div className="row  mx-2 my-3">
                  <div className="col-md-2 text-center">Event Center</div>
                  <div className="col-md-6 form-outline mb-0">
                    <select
                      id="eventVenue"
                      className="form-control"
                      value={eventVenue}
                      placeholder="Event Venue"
                      aria-describedby="Event Venue"
                      name="eventVenue" 
                      onChange={e => setEventVenue(e.target.value)}
                      required
                    >
                      <option value="">--event center--</option>
                      {venues.map((venue) => (
                        <option value={venue._id} key={venue._id}>{venue.name}</option>
                      ))}
                      ;
                    </select>
                  </div>
                </div>
                <div className="row  mx-2 my-3">
                  <div className="col-md-6 offset-3 form-outline mb-0">
                    <button type="button" className="btn btn-secondary">Reset</button>
                    {' '}
                    <button type="submit" className="btn btn-primary">{id > 0 ? 'Update' : 'Save'}</button>
                  </div>
                </div>
              </form>
            </div>  
          </div>
        </div>
      </div>
    );
}

export default DashboardHoc(CreateEvent);
