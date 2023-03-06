//Import the express module
const express = require('express')

//import Routes from app.js
const app = require('./app.js')

//import mongoose module
const mongoose = require('mongoose')

mongoose.set('strictQuery', true);

//Declare a specific listening port number
const PORT = process.env.PORT || 3000;

// Wide listing a cors to accept a specific domain route
const cors = require('cors');

// Parse JSON bodies (as sent by API clients)
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//enable cors usage
app.use(cors());

// Connect to DATABASE
const DATABASE_URL = "mongodb+srv://Navneeth:kirti90@cluster0.g79mpqx.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('connected to database'))


//app.listen() function which Binds and listens for connections on the specified host and port.
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))


//for testing
module.exports = app;
