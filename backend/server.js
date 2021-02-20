const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


global.__basedir = __dirname;
global.baseUrl = "http://localhost:5000";

// var corsOptions = {
//   origin: "http://localhost:8080"
// };
// app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());

const uri = process.env.LOCALHOST_URL;
mongoose.connect(uri, 
                    {useNewUrlParser: true, 
                    useCreateIndex: true, 
                    useUnifiedTopology: true,
                    useFindAndModify: false});

const  connection = mongoose.connection

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
})

// const login = require('./routes/user')
// app.use('/login', login)

const initRoutes = require("./routes");
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.listen(port, () => {
    console.log(`Server is runnin on localhost on port: ${port}!`);
})
