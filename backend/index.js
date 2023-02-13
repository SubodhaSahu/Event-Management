// eslint-disable-next-line import/no-extraneous-dependencies, node/no-unsupported-features/es-syntax
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import eventRouter from './routes/event.js';
import userRouter from './routes/user.js';
import serverRouter from './routes/test.js';
import DB from './config/mongodb.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// crate database connection
DB.connect();

/*
const myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
}; 
app.use(myLogger);
*/

app.get('/', (req, res) => {
  res.json('Welcome to the API');
});

// Event Routers
app.use('/event', eventRouter);

// User Routers
app.use('/user', userRouter);

/*
// Middleware to handle 404 request
app.use((req, res) => {
  res.status(404).json('404 Request Not Found');
});

// Error Handling using next
// app.use((err, req, res, next) => {
//   const { statusCode = 500, message = 'Oh No, Something Went Wrong!' } = err;
//   res.status(statusCode).json(err);
// });
*/
const PORT = process.env.PORT || 5000;
app.listen(PORT);
