const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'fullcycle'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL!');
  const createTable = `CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );`;
  connection.query(createTable, (err) => {
    if (err) throw err;
  });
});

app.get('/', (req, res) => {
  const name = `Full Cycle Rocks!`;
  connection.query(`INSERT INTO people(name) VALUES ('${name}')`, (err) => {
    if (err) throw err;
    connection.query(`SELECT name FROM people`, (err, results) => {
      if (err) throw err;
      let namesList = '<ul>';
      results.forEach(row => {
        namesList += `<li>${row.name}</li>`;
      });
      namesList += '</ul>';
      res.send(`<h1>Full Cycle Rocks!</h1>${namesList}`);
    });
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
