const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: 'aws-glassdoor-db.cy21yy4jdq6e.us-west-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123',
    database: 'glassdoor',
    insecureAuth: true,
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Connected to SQL Database');
    } else {
        console.log('SQL Database Connection Failed' + err);
    }
});

module.exports = mysqlConnection;