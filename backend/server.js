const dotenv = require('dotenv').config();
const express = require('express');
const connectDB = require("./config/connectDB")
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const Task = require('./model/taskModel');
const taskRoutes = require('./routes/taskRouter');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(
        {
            origin: [
                "http://localhost:3000"
            ]
        }
    ));
app.use(taskRoutes);

// Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening: ${PORT}`);
        });

    })
    .catch((err) => { console.log(err) });


