const express = require('express');
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routers
const eventRouter = require("./routes/event");
app.use("/event", eventRouter);


const userRouter = require("./routes/user");
app.use("/user", userRouter);

//console.dir(app)

/*app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    //res.send('Welcome to the World Of Node Js')
    res.render('home')
})

app.get('/random', function (req, res) {
    //res.send('Welcome to the World Of Node Js')
    const num = Math.floor((Math.random() * 10)) + 1;
    res.render('random', { num })
})
app.get('/r/:subreddit', function (req, res) {
    console.log(req.params)
    const { subreddit } = req.params;
    res.send(`This is sub rediit ${subreddit}`)
})
  
app.get('*', function (req, res) {
    //console.dir(req);
    res.send('Wrong URL....')
  })
  
// app.use((req, res) => {
//     console.log('We got some request')
//     console.dir(req)
//   })
*/

//Event GET Request
/*app.get('/event', function (req, res) {
    fs.readFile(path)
        .then((data) => {
            res.json(JSON.parse(data));
    })
    .catch((error) => {
        res.json(error)    
    });  
})*/

//Event POST Request
/*app.post('/event', function (req, res) {
    fs.readFile(path)
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
            fs.writeFile(path, JSON.stringify(events))
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
  })*/

  app.listen(3080)