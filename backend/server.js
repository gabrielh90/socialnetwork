const express = require('express');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');
const morgan = require('morgan');

// Load env vars
require('dotenv').config({path: './config/config.env'});


// Connect to database
connectDB();

const app = express();



global.__basedir = __dirname;
global.baseUrl = "http://localhost:5000";

// var corsOptions = {
//   origin: "http://localhost:8080"
// };
// app.use(cors(corsOptions));

app.use(cors());

//Body parser
app.use(express.json());


// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    // app.use(logger);
    app.use(morgan('dev'));
}

// const login = require('./routes/user')
// app.use('/login', login)

const initRoutes = require("./routes");
app.use(express.urlencoded({ extended: true }));
initRoutes(app);




// function print (path, layer) {
//     if (layer.route) {
//       layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
//     } else if (layer.name === 'router' && layer.handle.stack) {
//       layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
//     } else if (layer.method) {
//       console.log('%s /%s',
//         layer.method.toUpperCase(),
//         path.concat(split(layer.regexp)).filter(Boolean).join('/'))
//     }
//   }
  
//   function split (thing) {
//     if (typeof thing === 'string') {
//       return thing.split('/')
//     } else if (thing.fast_slash) {
//       return ''
//     } else {
//       var match = thing.toString()
//         .replace('\\/?', '')
//         .replace('(?=\\/|$)', '$')
//         .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
//       return match
//         ? match[1].replace(/\\(.)/g, '$1').split('/')
//         : '<complex:' + thing.toString() + '>'
//     }
//   }
  
//   app._router.stack.forEach(print.bind(null, []))

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} on localhost on port: ${PORT}!`.yellow.bold);
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
})
