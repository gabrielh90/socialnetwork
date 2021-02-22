const express = require("express");
const router = express.Router();
const userCreateAcc = require("./userCreateaAcc");
const createPost = require("./createPost")

let routes = (app) => {
  const login = require('./userLogIn')
  app.use('/login', login);
  const recoverAcc = require('./userRecoverAcc');
  app.use('/recover', recoverAcc);
  router.post("/newacc", userCreateAcc.create);
  router.post("/newpost", createPost.newPost);

  router.get("/files", userCreateAcc.getListFiles);
  router.get("/files/:name", userCreateAcc.download);


  const search = require('./search')
  router.post('/search', search.getUsers);
  const profile = require('./profile')
  router.post('/:id', profile.getProfile);
  router.post('/:id/update', profile.updateProfile);
  const home = require('./home')
  app.use('/', home);
  app.use(router);
};

module.exports = routes;
