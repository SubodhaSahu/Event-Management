import Repository from './Repository';

const userUrl = 'users';
const eventUrl = 'events';
const venueUrl = 'venues';
const authUrl = 'auth';

const apis = {
    login(payload) {
        return Repository.post(`${authUrl}/login`, payload);
    },
    signup(payload) {
        return Repository.post(`${userUrl}`, payload);
    },
    getEvents() {
        return Repository.get(`${eventUrl}`);
    },
    getEventById(id) {
        return Repository.get(`${eventUrl}/${id}`);
    },
    postEvents(payload) {
        return Repository.post(`${eventUrl}`, payload);
    },
    putEvents(id, payload) {
        return Repository.put(`${eventUrl}/${id}`, payload);
    },
    deleteEvent(id) {
        return Repository.delete(`${eventUrl}/${id}`);
    },
    getVenue() {
        return Repository.get(`${venueUrl}`);
    }
};

export default apis;
