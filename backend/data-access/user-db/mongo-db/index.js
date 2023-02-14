import User from '../../../db/mongodb/models/users.js';
import userSeeds from '../../../db/mongodb/models/users.js';

// Insert the bluck record
export async function blukInsert() {
  return await User.insertMany(userSeeds)
    .then((data) => console.log(data))
    .catch((e) => console.log(e));
}

// add a new user
export async function addUser(userInfo) {
  const newUser = new User(userInfo);
  await newUser.save();
  return newUser;
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
