import express from 'express';
import wrapAsynch from '../utils/AsynchErrorHandle.js';
import Event from '../models/events.js';
import eventSeeds from '../seeds/events.js';

const eventRouter = express.Router();
// eventRouter.get('/', (req, res) => {
//   res.send("hello I'm runnig 4000");
// });

/** ************Event API Using Mongo ************* */

// Used Only to push some data initially

eventRouter.post(
  '/many',
  wrapAsynch(async (req, res) => {
    await Event.insertMany(eventSeeds);
    // .then(data => console.log(data))
    // .catch(e => console.log(e))
  })
);

eventRouter.get(
  '/',
  wrapAsynch(async (req, res) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 5 } = req.query;
    if (page < 1) {
      throw Error(`Invalid page number`);
    }

    // get the events
    const events = await Event.find({});
    // .limit(limit * 1)
    // .skip((page - 1) * limit);
    // console.log(Event);

    // get total documents in the Events collection
    const count = await Event.countDocuments();

    // return response with events, total pages, and current page
    res.json({
      events,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  })
);

// Post Request to create event
eventRouter.post(
  '/',
  wrapAsynch(async (req, res) => {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent._id);
  })
);

// Find event by id
eventRouter.get(
  '/:id',
  wrapAsynch(async (req, res) => {
    const { id } = req.params;
    const event = await Event.findById(id);
    res.status(200).json(event);
  })
);

eventRouter.put(
  '/:id',
  wrapAsynch(async (req, res) => {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json(event);
  })
);

eventRouter.delete(
  '/:id',
  wrapAsynch(async (req, res) => {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    res.status(200).json(event);
  })
);

/** ************Event API Using File System ************* */
// const path = require('path');
// const fs = require('fs/promises');

// const jsonFile = `${path.join(process.cwd(), 'json')}/events.json`;
/** 
//Commenting the JSON read functions as reading from JSOn not working in Vercerl app
router.get("/", async (req, res) => {
    fs.readFile(jsonFile)
        .then((data) => {
            res.json(JSON.parse(data));
    })
    .catch((error) => {
        res.json(error)    
    });  
});

router.post("/", async (req, res) => {
    fs.readFile(jsonFile)
    .then((data) => {
        let events = JSON.parse(data);
        let newData = {
            "id": events.length + 1,
            "eventTitle": req.body.eventTitle ?? ' ',
            "eventDesc": req.body.eventDesc ?? '',
            "eventDate": req.body.eventDate ?? '',
            "eventVenue": req.body.eventVenue ?? '' 
        };
        events.push(newData);
        fs.writeFile(jsonFile, JSON.stringify(events))
            .then(() => {
                res.status(201).json({'message' : 'Event Saved successfully'});
            })
            .catch(er => {
                res.json(error);
            });
    })
    .catch((error) => {
        res.json(error)      
    });
});

// router.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   const post = await Posts.findByPk(id);
//   res.json(post);
// });
*/

export default eventRouter;
