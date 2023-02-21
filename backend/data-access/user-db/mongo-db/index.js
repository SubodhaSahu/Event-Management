import bcrypt from 'bcrypt';
import User from '../../../db/mongodb/models/users.js';
import userSeeds from '../../../db/mongodb/seeds/users.js';

const hashPassword = async (pw) => {
  const saltRounds = 10; //The cost of processing the data
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = await bcrypt.hash(pw, salt);
  return hash;
};

// Insert the bluck record
export async function blukInsert() {
  return await User.insertMany(userSeeds)
    .then((data) => console.log(data))
    .catch((e) => console.log(e));
}

// add a new user
export async function addUser(userInfo) {
  userInfo.password = await hashPassword(userInfo.password);
  const newUser = new User(userInfo);
  return await newUser.save();
}

// add a new user
export async function getByEmail(email) {
  const user = await User.findOne({ email: email });
  return user;
}

//get all the user list

export async function getUsers() {
  return await User.find({});
}

// Match the enrypted password

export async function validateCredential(email, password) {
  const user = await User.findOne({ email: email });
  const match = await bcrypt.compare(password, user.password);
  if (match) return true;
  return false;
}
