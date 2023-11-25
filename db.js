const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "ricefarm.cqektq58l44f.us-east-1.rds.amazonaws.com",
    database: "ricefarm",
    password: "~TEnxE8!C#hR*qi",
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = pool;