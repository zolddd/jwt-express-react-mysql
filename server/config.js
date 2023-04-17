import { createPool } from "mysql2/promise";

export const pool = new createPool({
    host:"localhost",
    password:"1234",
    user:"root",
    database:"pasteleria",
    port:3306
});


