require('dotenv').config();
const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error("Database connnection error:", err)
    } else {
        console.log("Database connected", res.rows[0])
    }
})

module.exports = pool