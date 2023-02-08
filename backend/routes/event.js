const express = require("express");
const path = require("path");
const fs = require('fs/promises');
const router = express.Router();
const jsonFile = path.join(process.cwd(), 'json') + '/events.json';
/*
const eventList = [
    {
        "id": 1,
        "eventTitle": "Worldview Education Fair – Accra – Ghana- 2023",
        "eventDesc": "It is a highly-targeted event, and we anticipate a large turnout of students and families eager to…",
        "eventDate": "11 Mar - 11 Mar 2022, 12:00 pm - 5:00 pm",
        "eventVenue": "Accra"
    },
    {
        "id": 2,
        "eventTitle": "Brooklyn Society For Ethical Culture",
        "eventDesc": "The Brooklyn Society for Ethical Culture offers a program for children that includes art, service projects, theatre,…",
        "eventDate": "05 Jul - 12 Aug 2022, 12:00 pm - 6:00 pm",
        "eventVenue": "BSEC"
    },
    {
        "id": 3,
        "eventTitle": "International Conference And Expo On Neonatology And Perinatology",
        "eventDesc": "Hilaris conferences we welcome you all to the International Conference and Expo on Neonatology and Perinatology in…",
        "eventDate": "04 May - 05 May 2022, 10:00 am - 6:00 pm",
        "eventVenue": "Amsterdam, Netherlands"
    },
    {
        "id": 4,
        "eventTitle": "3rd Annual Summit On Diabetes And Endocrinology",
        "eventDesc": "Conference Series LLC Ltd invites worldwide global audience and presenters to participate at the 3rd Annual Summit…",
        "eventDate": "14 Sep - 15 Sep 2022, 10:00 am - 5:00 pm",
        "eventVenue": "Avani Atrium Bangkok Hotel, 1880 New Petchaburi Rd,"
    }

];

router.get("/", (req, res) => {
    res.json(eventList);
});
*/

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

module.exports = router;
