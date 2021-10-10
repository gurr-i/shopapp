import { join } from "path";
// import { ConnectionOptions} from "tls";
import { ConnectionOptions } from "typeorm";
import { User } from "./auth/entity/user.entity";


// const config = {
//     host: "localhost",
//     user: "postgres",
//     password: "5134957",
//     database: "postgres",

// };

const connectionOptions: ConnectionOptions = {
    type: "postgres",
    url: "postgres://evmngqwjyksqhi:6251cd3b5da29fdd884618262ba5f717ed0ea9dd4b2871c2428d34e499982a25@ec2-44-199-86-61.compute-1.amazonaws.com:5432/d9rglt7i56h1gg",
    host: "ec2-44-199-86-61.compute-1.amazonaws.com",
    port: 5432,
    username: "evmngqwjyksqhi",
    password: "6251cd3b5da29fdd884618262ba5f717ed0ea9dd4b2871c2428d34e499982a25",
    database: "d9rglt7i56h1gg",
    entities: [User],

    extra: {
        ssl: {
            rejectUnauthoroized: false,
        },
    },

    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    logging: false,
    logger: "debug",
    migrations: [join(__dirname, "src/migration/**/*.ts")],

};
export = connectionOptions;