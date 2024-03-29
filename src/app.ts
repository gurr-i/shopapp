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
// const port = 8080;
// var express = require('express');
// const PORT = process.env.PORT || 3000;
const port = process.env.PORT || 8080;
const app = express();
createConnection(config as ConnectionOptions)
    .then(async (connection) => {
        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        // app.listen(process.env.PORT || 3000);


        app.use("/", router)
        app.listen(port, () => {
            console.log('Server is running at', port);
        });
    })
    .catch((error) => {
        console.log(error);

    });

//Dangerous
if ("development" == app.get("env")) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}