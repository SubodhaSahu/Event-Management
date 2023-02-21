import {
  blukInsert,
  addUser,
  getByEmail,
  validateCredential,
  getUsers,
} from './mongo-db/index.js';

const userDb = {
  blukInsert,
  addUser,
  getByEmail,
  validateCredential,
  getUsers,
};

export default userDb;
