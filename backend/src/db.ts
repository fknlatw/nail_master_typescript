import mysql from "mysql2";
import "dotenv/config.js";
import { Pool } from "mysql2";

// const pool: Pool = mysql.createPool({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
// });

// export default pool;

class DatabasePool {
    private static instance: DatabasePool;
    private pool: Pool;

    private constructor() {
        this.pool = mysql.createPool({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });
    }

    static getInstance() {
        if(!DatabasePool.instance) {
            DatabasePool.instance = new DatabasePool();
        }

        return DatabasePool.instance;
    }

    getPool() {
        return this.pool;
    }
}

export default DatabasePool.getInstance().getPool();