const express = require("express");
const path = require("path");
const fs = require('fs/promises');
const router = express.Router();

const jsonFile = path.join(process.cwd(), 'json') + '/events.json';

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

module.exports = router;
