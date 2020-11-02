const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.LOCALHOST_URL;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const  connection = mongoose.connection

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
})

const login = require('./routes/user')
app.use('/login', login)



app.listen(port, () => {
    console.log(`Server is runnin on port: ${port}!`);
})