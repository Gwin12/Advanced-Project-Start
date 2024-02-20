const express = require("express");
const cacheControl = require("express-cache-ctrl");
const app = express();
const apiRouter = require("../api/v1/routes/apiRouter");


const PORT = process.env.PORT


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





app.listen(PORT, () => {
    console.log(`Server running...`);
    // console.log(`worker pid=${process.pid}`);
})




module.exports = app;