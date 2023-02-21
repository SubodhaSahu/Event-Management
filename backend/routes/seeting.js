import eventRouter from './event.js';
import userRouter from './user.js';
import venueRouter from './venue.js';
import serverRouter from './test.js';

export default function routers(app) {
  // // Event Routers
  app.use('/events', eventRouter);
  app.use('/users', userRouter);
  app.use('/venues', venueRouter);
  app.use('/test', serverRouter);
}
