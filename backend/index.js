const express = require('express');
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routers
const eventRouter = require("./routes/event");
app.use("/event", eventRouter);


const userRouter = require("./routes/user");
app.use("/user", userRouter);

app.get("/",  (req, res) => {
    res.json('Welcome to the API');
});

const PORT = process.env.PORT || 5000
app.listen(PORT)