/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideBarHoc from './SideBarHoc';

const apiURL = `${process.env.REACT_APP_API}event`;

function AddEvent() {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
      axios
        .post(apiURL, {
          eventTitle,
          eventDesc,
          eventDate,
          eventVenue
        })
        .then(() => {
          navigate('/dashboard');
        }).catch((err) => {
          setError(err);
        });
  };
  if (error) return `Error: ${error.message}`;
  
    return (
      <div>
        <div className="card">
          <div className="card-title p-3">
            Add Event 
            <a href="/dashboard" className="btn btn-primary float-end">Go Back</a>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row  mx-2 my-3">
                <div className="col-md-1">
                  <label htmlFor="eventTitle" className="col-form-label">Title</label>
                </div>
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
                <div className="col-md-1">
                  <label htmlFor="eventDesc" className="col-form-label">Description</label>
                </div>
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
                <div className="col-md-1">
                  <label htmlFor="eventDate" className="col-form-label">Date</label>
                </div>
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
                <div className="col-md-1">
                  <label htmlFor="eventVenue" className="col-form-label">Venue</label>
                </div>
                <div className="col-md-6 form-outline mb-0">
                  <input
                    type="text"
                    id="eventVenue"
                    className="form-control"
                    aria-describedby="Event Venue"
                    placeholder="Event Venue"
                    name="eventVenue" 
                    onChange={e => setEventVenue(e.target.value)} 
                    value={eventVenue}
                    required
                  />
                </div>
              </div>
              <div className="row  mx-2 my-3">
                <div className="col-md-6 offset-3 form-outline mb-0">
                  <button type="button" className="btn btn-secondary">Reset</button>
                  {' '}
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </div>
            </form>
          </div>  
        </div>
      </div>
    );
}

export default SideBarHoc(AddEvent);
