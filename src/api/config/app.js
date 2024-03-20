const express = require("express");
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
    const period = 60 * 5;      // keep cache for 5mins

    if (req.method === "GET") {
        res.set("Cache-control", `public, max-age=${period}`);
    } else {
        // for the other requests set strict no caching parameters
        res.set("Cache-control", `no-store`);
    }

    next();
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