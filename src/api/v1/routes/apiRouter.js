const express = require("express");
const apiRouter = express.Router();
const cors = require("cors");

// Controllers
const usersController =  require('../controllers/usersController')
const { loadTest } = usersController






apiRouter.use(
    cors({
        origin: "*",
    })
);



apiRouter.route("/users")
    .get()
    .post();

apiRouter.route("/loadTest")
    .get(loadTest)
    .post();




module.exports = apiRouter;
