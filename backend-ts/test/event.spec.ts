import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import Events from '../src/models/Events';
import Venue from '../src/models/Venue';
import app from './server.spec';


process.env.NODE_ENV = 'test';

chai.should();
chai.use(chaiHttp);

// After unit test Clear the Database
after(async () => { 
  await Events.deleteMany({});
  await Venue.deleteMany({});
})


/**
 * Test the Event API route
 */
describe('Test GET route /events', () => {
  it('It should return all events', (done) => {
    chai.request(app)
    .get('/events')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.events).to.be.a('array');
        done();
      });
    });
});

/**
 * Test POST Venue Request we need venue Id in order to create an event
 */
let venueId = '';
describe('POST /venues', () => {
  it('It should POST a new venue', (done) => {
    const venues = {
      name: 'RapidFunnel Conference',
      address: 'Angul, Odisha',
    };
    chai
      .request(app)
      .post('/venues')
      .send(venues)
      .end((err, res) => {
        venueId = res.body._id;
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        done();
      });
    });
});

/**
 * Test the POST Event API route
 */
describe('POST /events', () => {
  it('It should POST a new events', (done) => {
    const event = {
      eventTitle: 'RapidFunnel Conference',
      eventDesc: 'Lore Ipsume confernce detaisls',
      eventDate: '05 Jul - 12 Aug 2022, 12:00 pm - 6:00 pm',
      eventVenue: venueId,
    };
    chai
      .request(app)
      .post('/events')
      .send(event)
      .end((err, res) => {
        // console.log(res)
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        done();
      });
    });
});