const express = require('express');
const cors = require("cors");
const express = require("express")
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname + "/public")))

// Routers
const eventRouter = require("./routes/event");
app.use("/event", eventRouter);


const userRouter = require("./routes/user");
app.use("/user", userRouter);

const PORT = process.env.PORT || 5000
app.listen(PORT)