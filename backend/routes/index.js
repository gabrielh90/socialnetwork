const express = require("express");
const router = express.Router();
const controller = require("./userCreateaAcc");


let routes = (app) => {
  const login = require('./user')
  router.post("/newacc", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);
  
  app.use('/login', login)
  app.use(router);
};

module.exports = routes;
