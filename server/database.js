const { Pool } = require("pg")

const pool = new Pool({

user: "postgres",
host: "localhost",
database: "password_manager",
password: "Ornitorrinco13@",
port: 5432,

})

module.exports = pool