import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const username = encodeURIComponent('mongo-mern');
const password = encodeURIComponent('mongo@123');
const dbName = encodeURIComponent('eventManagement');

//const mongoURL = `${process.env.mongoUrl}`;
const mongoURL = `mongodb+srv://${username}:${password}@cluster0.y4ibni5.mongodb.net/${dbName}?retryWrites=true&w=majority`;
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
