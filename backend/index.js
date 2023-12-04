const express = require('express');
const cors = require('cors');
const { constants, dbconstants } = require('./env');
const mongoose = require('mongoose');
const booksRouter = require('./routes/books');

const app = express();

mongoose.connect(dbconstants.MONGODB_CONNECTION_URL);
mongoose.connection.on('error', err => {
    console.log('connection failed');
});
mongoose.connection.on('connected', connected => {
    console.log("connected with database");
});

app.use(cors('*'));
app.use(express.json());
app.use('/api/books', booksRouter);

app.listen(constants.SERVER_PORT, '0.0.0.0', () => {
    console.log("server started at "+constants.SERVER_PORT+"...");
});