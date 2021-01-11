const express = require("express");
const router = express.Router();
const userCreateAcc = require("./userCreateaAcc");
const createPost = require("./createPost")

let routes = (app) => {
  const login = require('./userLogIn')
  app.use('/login', login);
  const recoverAcc = require('./userRecoverAcc');
  app.use('/recover', recoverAcc);
  router.post("/newacc", userCreateAcc.upload);

  
  router.post("/newpost", createPost.newPost);

  router.get("/files", userCreateAcc.getListFiles);
  router.get("/files/:name", userCreateAcc.download);

  app.use(router);
};

module.exports = routes;
