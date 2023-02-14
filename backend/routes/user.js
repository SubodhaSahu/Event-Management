import express from 'express';
import wrapAsynch from '../utils/AsynchErrorHandle.js';
import userDb from '../data-access/user-db/index.js';

const { blukInsert, addUser, getByEmail, getUsers } = userDb;

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
    const newUser = await addUser(req.body);
    res.status(201).json(newUser._id);
  })
);

userRouter.post(
  '/login',
  wrapAsynch(async (req, res) => {
    const userF = getByEmail(req.body.email);
    userF
      .then((data) => {
        // Means user present so validate the password
        if (req.body.password === data.password) {
          res.status(200).json({
            success: true,
            message: 'Login successful',
          });
        } else {
          res.status(401).json({
            success: false,
            message: 'Invalid Credential',
          });
        }
      })
      .catch((e) => {
        res.status(401).json({
          success: false,
          message: 'Invalid Email',
        });
      });
  })
);

/** ********** User API endpoint using file system */
/*
router.post("/login", async (req, res) => {
    let user = checkEmail(users, req.body.email);
    if (user) {
        if (req.body.password === user.password) {
            res.status(200).json({
                success: true,
                message: 'Login successful',
                user: user
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid Credential',
            });
        }
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid Email',
        });
    }
});
*/

/** 
//Commented the code as vercel unable to read the file
const jsonFile = path.join(process.cwd(), 'json') + '/users.json';

router.post("/login", async (req, res) => {
    fs.readFile(jsonFile)
        .then((data) => {
            let users = JSON.parse(data);
            let user = checkEmail(users, req.body.email); 
            if (user) {
                if (req.body.password === user.password) {
                    res.status(200).json({
                        success: true,
                        message: 'Login successful',
                        user : user
                    });
                } else {
                    res.status(401).json({
                        success: false,
                        message: 'Invalid Credential',
                    });
                }
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Invalid Email',
                });
            }
            
    })
    .catch((error) => {
        res.json(error)    
    });  
});
*/

export default userRouter;
