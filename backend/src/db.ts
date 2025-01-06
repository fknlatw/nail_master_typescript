import mysql from "mysql2";
import "dotenv/config.js";
import { Pool } from "mysql2";

const pool: Pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

export default pool;