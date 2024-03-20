const express = require("express");
const cacheControl = require("express-cache-ctrl");
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT


//boiler plate to access user input
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("An error have occured!");
});




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



// connecting to database first before listening for requests
async function connectDb() {
    try {
        const db = require('./dbConfig')
        const { isConnected, database } = await db()

        
        module.exports = { app, database }

        // listening only when the database has connected
        if (isConnected) {
            const apiRouter = require("../v1/routes/apiRouter");
            app.use("/api", apiRouter);



            app.listen(PORT, () => console.log(`Server running...`))

        }

    } catch (error) {
        console.log(error)
    }
}

connectDb()