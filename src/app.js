const express = require("express");
const cacheControl = require("express-cache-ctrl");
const app = express();
const apiRouter = require("./api/v1/routes/apiRouter");



//boiler plate to access user input
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("An error have occured!");
});


app.use("/api", apiRouter);



const setCache = function (req, res, next) {
    if (req.method === "GET") {

        cacheControl({
            maxAge: 3600, // Cache for 1 hour (in seconds)
            public: true, // Cache is public (can be cached by intermediary caches)
        })(req, res, next); // Apply cache control middleware

    } else {
        next(); // Pass non-GET requests to the next middleware or route handler
    }
};


app.use(setCache);



// const setCache = function (req, res, next) {
//     // keep cache for 5mins
//     const period = 60 * 5;

//     if (req.method === "GET") {
//         res.set("Cache-control", `public, max-age=${period}`);
//     } else {
//         // for the other requests set strict no caching parameters
//         res.set("Cache-control", `no-store`);
//     }

//     next();
// };





module.exports = app;