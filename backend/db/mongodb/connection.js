import mongoose from 'mongoose';
import config from '../../config/index.js';

const dbName = encodeURIComponent('eventManagement');

// Set environment variables
let env = process.env.NODE_ENV;
let mongoURL = config.mongo.MONGO_URL;

// if (env === 'production') {
//   //get mogo atlas URL
//   const username = encodeURIComponent(config.mongo.MONGO_USER);
//   const password = encodeURIComponent(config.mongo.MONGO_PW);
//   mongoURL = `mongodb+srv://${username}:${password}@cluster0.y4ibni5.mongodb.net/${dbName}?retryWrites=true&w=majority`;
// }

const username = encodeURIComponent('mongo-mern');
const password = encodeURIComponent('mongo@123');
mongoURL = `mongodb+srv://${username}:${password}@cluster0.y4ibni5.mongodb.net/${dbName}?retryWrites=true&w=majority`;

export default {
  connect() {
    mongoose
      .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('MONGO CONNECTION OPEN!!!');
      })
      .catch((err) => {
        console.log('OH NO MONGO CONNECTION ERROR!!!!');
        console.log(err);
      });
  },
};
