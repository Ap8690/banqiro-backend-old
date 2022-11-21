const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user:'root',
//   password:'password',
//   database:'crypto',
//   port:3306,
//   timezone:'+00:00'
// })

const connection = mysql.createConnection({
  host: "localhost",
  user: "crypto_user_back",
  password: "At54rtFq8qcgd3S",
  database: "crypto_landing_back",
  port: 3306,
  timezone: "+00:00",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("crypto_landing_bac Connection Done");
});

module.exports = connection;
