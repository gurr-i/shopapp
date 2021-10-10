// console.log("lets rock!")
// import { Express } from "express";
import "reflect-metadata";
import express from "express"
import { ConnectionOptions, createConnection } from "typeorm";
import config from "./ormconfig";
import { router } from "./routes";
// const app = express()

// app.get("/", (req, res) => {
//     res.send("API IS ROCKING!");

// });

// app.listen(8080, () => {
//     console.log("Server is running at 8080 port.");
// })

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
const port = 8080;

createConnection(config as ConnectionOptions)
    .then(async (connection) => {
        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        const port = 8080;


        app.use("/", router)
        app.listen(port, () => {
            console.log('Server is running at',port);
        });
    })
    .catch((error) => {
        console.log(error);

    });