const cluster = require("cluster");
const os = require("os");
const path = require("path");



async function loadBalancer() {
    try {
        const filePath = __filename;   // The file path of the curren module
        const directoryName = path.dirname(filePath);   // Get the directory name of the current module

        const cpuCount = os.cpus().length;

        // console.log(`The total number of CPUs is ${cpuCount}`);
        // console.log(`The Primary pid=${process.pid}`);



        // running app.js from  primary
        cluster.setupPrimary({
            exec: directoryName + "/app.js"
        });

        
        for (let i = 0; i < cpuCount; i++) {
            cluster.fork();
        }



        // when one of the instance is down, starts another instance...to ustilize the cores
        cluster.on("exit", (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} has been killed`);
            console.log(`Starting another Worker`);

            cluster.fork();
        });

    } catch (error) {
        console.log(error)
    }
}

loadBalancer()

// module.exports = loadBalancer