var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "hostel9685.czqufacnwj4v.us-east-2.rds.amazonaws.com",
    user: "hostel9685",
    password: "hostel9685",
    database: 'bookstoredb',
    port: "3306"
});

connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }

    console.log('Connected to database.');
});

module.exports = connection;