import express from 'express';
import bcrypt from 'bcrypt';
const serverRouter = express.Router();

const hashPassword = async (pw) => {
  const saltRounds = 10; //The cost of processing the data
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = await bcrypt.hash(pw, salt);
  return hash;
};
const login = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match;
};

serverRouter.get('/', async (req, res) => {
  const hasPwd = await hashPassword('123456');
  const match = await login('123456', hasPwd);
  console.log(match);
  if (match) {
    res.send('Password Match');
  } else {
    res.send('Password Not Match');
  }
});

export default serverRouter;
