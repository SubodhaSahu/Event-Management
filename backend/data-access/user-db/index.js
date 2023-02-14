import { blukInsert, addUser, getByEmail, getUsers } from './mongo-db/index.js';

const userDb = {
  blukInsert,
  addUser,
  getByEmail,
  getUsers,
};

export default userDb;
