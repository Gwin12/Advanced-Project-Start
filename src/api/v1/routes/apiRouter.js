const express = require("express");
const apiRouter = express.Router();
const cors = require("cors");

// Controllers
const usersController =  require('../controllers/usersController')
const { findUsers } = usersController






apiRouter.use(
    cors({
        origin: "*",
    })
);



apiRouter.route("/users")
    .get(findUsers)
    .post();

apiRouter.route("/users")
    .get()
    .post();




module.exports = apiRouter;
