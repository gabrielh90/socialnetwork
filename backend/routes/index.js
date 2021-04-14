const express = require("express");
const router = express.Router();


let routes = (app) => {

  // const login = require('./___userLogIn')
  // app.use('/login', login);

  // const home = require('./home')
  // app.use('/', home);


  const auth = require('./auth');
  app.use('/api/v1/auth', auth);

  const users = require('./users');
  app.use('/api/v1/users', users);

  const friends = require('./friends');
  app.use('/api/v1/friends', friends);

  const posts = require('./posts');
  app.use('/api/v1/posts', posts);
  
  const reviews = require('./reviews');
  app.use('/api/v1/reviews', reviews);

  const images = require("./images");
  app.use('/api/v1/images', images);

  app.use(router);
};

module.exports = routes;
