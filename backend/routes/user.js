import express from 'express';
import wrapAsynch from '../utils/AsynchErrorHandle.js';
import userDb from '../data-access/user-db/index.js';

const { blukInsert, addUser, getByEmail, validateCredential, getUsers } =
  userDb;

const userRouter = express.Router();

/** *** User API endpoint using Mongo DB */
userRouter.post(
  '/many',
  wrapAsynch(async (req, res) => {
    await blukInsert(userSeeds);
  })
);

//Get All User
userRouter.get(
  '/',
  wrapAsynch(async (req, res) => {
    const user = await getUsers();
    res.status(201).json(user);
  })
);

userRouter.post(
  '/',
  wrapAsynch(async (req, res) => {
    const userF = await getByEmail(req.body.email);

    //Check if user exist
    if (userF) {
      res.status(422).json({
        success: false,
        message: 'User already exists. Try with a different email.',
      });
    } else {
      const newUser = await addUser(req.body);
      res.status(201).json(newUser._id);
    }
  })
);

userRouter.post(
  '/login',
  wrapAsynch(async (req, res) => {
    const userF = getByEmail(req.body.email);
    userF
      .then(async (data) => {
        const match = await validateCredential(
          req.body.email,
          req.body.password
        );
        if (match) {
          let { _id, email, name } = data; //Get the User info

          res.status(200).json({
            success: true,
            message: 'Login successful',
            userInfo: { _id: _id, name: name, email: email },
          });
        } else {
          res.status(401).json({
            success: false,
            message: 'Invalid Credential',
          });
        }
      })
      .catch((e) => {
        console.log(e);
        res.status(401).json({
          success: false,
          message: 'Invalid Email',
        });
      });
  })
);

export default userRouter;
