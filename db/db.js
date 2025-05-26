import mysql from "mysql2";

export const pool = mysql.createPool({
    host: process.env.HOST1,
    user: process.env.USER1,
    password: process.env.PASSWORD1,
    database: process.env.DATABASE1,
});
