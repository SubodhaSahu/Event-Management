import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardHoc from '../LayoutHoc/DashboardHoc';

const apiURL = `${process.env.REACT_APP_API}venues`;

function CreateVenue() {
  const { id = 0 } = useParams(); 
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== '') {
      axios.get(`${apiURL}/${id}`).then((response) => {
        const {
          eventTitle: title, eventDesc: desc,
          eventDate: date, eventVenue: venue, 
        } = response.data;
        setEventTitle(title);
        setEventDesc(desc);
        setEventDate(date);
        setEventVenue(venue);
      });
    }
  }, [id]);

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
          navigate('/venue');
        }).catch((err) => {
          setError(err);
        });
  };
  if (error) return `Error: ${error.message}`;
  
    return (
      <div
        className="container-fluid mt-0"
        style={{ minHeight: '100%', height: '100%' }}
      >
        <div className="col align-items-stretch">
          <div className="card h-100">
            <div className="card-title p-3">
              <span className="text-center">Add Event </span>
              <a href="/dashboard" className="btn btn-primary float-end">Go Back</a>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row  mx-2 my-3">
                  <div className="col-md-1">Title</div>
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
                  <div className="col-md-1"> Description</div>
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
                  <div className="col-md-1">Date</div>
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
                  <div className="col-md-1">Venue</div>
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
      </div>
    );
}

export default DashboardHoc(CreateVenue);
