import Repository from './Repository';

const userUrl = 'users';
const venueUrl = 'venues';
const eventUrl = 'events';
const authUrl = 'auth';

const apis = {
  login(payload: { email: string; password: string }) {
    return Repository.post(`${authUrl}/login`, payload);
  },
  signup(payload: { email: string; password: string; name: string }) {
    return Repository.post(`${authUrl}/signup`, payload);
  },
  getEvents() {
    return Repository.get(`${eventUrl}`);
  },
  getEventsByVenue(venueId: string) {
    return Repository.get(`${eventUrl}/v/${venueId}`);
  },
  getEventById(id: number) {
    return Repository.get(`${eventUrl}/${id}`);
  },
  postEvents(payload: object) {
    return Repository.post(`${eventUrl}`, payload);
  },
  putEvents(id: number, payload: object) {
    return Repository.put(`${eventUrl}/${id}`, payload);
  },
  deleteEvent(id: number) {
    return Repository.delete(`${eventUrl}/${id}`);
  },
  getVenue() {
    return Repository.get(`${venueUrl}`);
  },
  getVenueById(id: string) {
    return Repository.get(`${venueUrl}/${id}`);
  },
  postVenue(payload: object) {
    return Repository.post(`${venueUrl}`, payload);
  },
  putVenue(id: string, payload: object) {
    return Repository.put(`${venueUrl}/${id}`, payload);
  },
  deleteVenue(id: string) {
    return Repository.delete(`${venueUrl}/${id}`);
  },
  getUsers() {
    return Repository.get(`${userUrl}`);
  },
};

export default apis;
