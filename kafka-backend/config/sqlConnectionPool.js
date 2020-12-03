const mysql = require('mysql');

var mysqlConnectionPool = mysql.createPool({
    host: 'aws-glassdoor-db.cy21yy4jdq6e.us-west-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123',
    database: 'glassdoor',
    insecureAuth: true,
    connectionLimit: 12,
});

mysqlConnectionPool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'ECONNREFUSED') {
            console.error('SQL Database connection failed');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('SQL Database has too many connections');
        }
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('SQL Databse connection was lost');
        }
    } else if (connection) {
        connection.release();
        console.log('Connected to SQL Database');
        return;
    }
});

module.exports = mysqlConnectionPool;