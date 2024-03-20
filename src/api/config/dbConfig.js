// DATABASE CONFIGURATIONS

async function connectTest() {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                console.log("Database Connected")
                resolve({database: "database details", isConnected: true})
                
            }, 2000);
        } catch (error) {
            console.log(error)
            reject({database: "failed", isConnected: false})
        }
    })
        
}

module.exports = connectTest





// const { MongoClient, ServerApiVersion } = require('mongodb');

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(process.env.CONNECTIONSTRING, {

//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true
//     }
// });

// async function run() {
//   return new Promise(async(resolve, reject) => {
//     try {
//       await client.connect();      // Connect the client to the server	(optional starting in v4.7)
//       await client.db("admin").command({ ping: 1 });      // Send a ping to confirm a successful connection
//       console.log("Connected to MongoDB");
  
//       resolve({database: client, isConnected: true})
      
//     } catch(error) {
//       console.error(error)
//       reject({database: "failed", isConnected: false})

//     }
//   })
// }

// module.exports = run






// // MySQL CONNECTION
// const mysql = require('mysql2')
// const { MAINUSER, HOST, PASSWORD, DATABASE } = process.env



// // Connecting to MySQL Server
// async function connectToMySQL() {
//   return new Promise(async(resolve, reject) => {
//     try {
    
//       const connection = await mysql.createConnection({
//         host: HOST,
//         user: MAINUSER, 
//         password: PASSWORD, 
//         database: DATABASE, 
//         waitForConnections: true,
//         connectionLimit: 10,
//         queueLimit: 0
//       }).promise()
  


//     //   connection.connect(err => {
//     //     if (err) {
//     //         console.error('Error connecting to MySQL:', err);
//     //         return;
//     //     }
//     //     console.log('Connected to MySQL database');
//     // });


//       resolve(connection)
  
//     } catch (error) {
//       console.error(error)
//       reject(error)
//     }

//   })
// }



// async function runDB() {
//   try {
//     const connection = await connectToMySQL()
//     // console.log(pool)
//     console.log("Connected To Database."); 

//     module.exports = connection


//     const loadBalancer = require('./primary')
//     loadBalancer()

//   } catch (error) {
//     console.log(error)
//   }
// }


// runDB()


