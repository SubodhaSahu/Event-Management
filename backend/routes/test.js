import express from 'express';
const serverRouter = express.Router();

serverRouter.get('/', (req, res) => {
  res.send("hello I'm runnig 4000");
});

export default serverRouter;
