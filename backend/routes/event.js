import express from 'express';
import wrapAsynch from '../utils/AsynchErrorHandle.js';
import eventDb from '../data-access/event-db/index.js';

const {
  listEvents,
  eventCount,
  blukInsert,
  addEvent,
  getEventById,
  updateEventById,
  deleteEventById,
} = eventDb;

const eventRouter = express.Router();

/** ************Event API Using Mongo ************* */

// Used Only to push some muck data initially
eventRouter.post(
  '/many',
  wrapAsynch(async (req, res) => {
    await blukInsert();
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
    const events = await listEvents(page, limit);

    // get total documents in the Events collection
    const count = await eventCount();

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
    const newEvent = await addEvent(req.body);
    res.status(201).json(newEvent._id);
  })
);

// Find event by id
eventRouter.get(
  '/:id',
  wrapAsynch(async (req, res) => {
    const event = await getEventById(req.params);
    res.status(200).json(event);
  })
);

eventRouter.put(
  '/:id',
  wrapAsynch(async (req, res) => {
    const { id } = req.params;
    const event = await updateEventById(id, req.body);
    res.status(200).json(event);
  })
);

eventRouter.delete(
  '/:id',
  wrapAsynch(async (req, res) => {
    const { id } = req.params;
    const event = await deleteEventById(id);
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
