import eventRouter from './event.js';
import userRouter from './user.js';

export default function (app) {
  // // Event Routers
  app.use('/event', eventRouter);
  app.use('/user', userRouter);
}

// // User Routers
//app.use('/user', userRouter);

// export const router = {
//   eventRouter,
//   userRouter,
// };
