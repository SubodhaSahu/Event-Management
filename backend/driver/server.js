import express from 'express';
import cors from 'cors';
import routers from '../routes/seeting.js';
import DB from '../db/mongodb/connection.js';
import config from '../config/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
routers(app);

// crate database connection
DB.connect();

app.get('/', (req, res) => {
  res.json(config);
});

/*******Example Code for future refernces */

/*
const myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
}; 
app.use(myLogger);
*/

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
