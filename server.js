const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware untuk mengurai body dari request POST
app.use(bodyParser.json());

// Middleware untuk mengkonfigurasi CORS
app.use(cors());

app.post('/signup', (req, res) => {
  const userData = req.body;
  
  // Membaca file user.json
  fs.readFile('user.json', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    let users;
    try {
      users = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      res.status(500).send('Internal Server Error');
      return;
    }

    users.push(userData);

    // Menulis kembali file user.json dengan data baru
    fs.writeFile('user.json', JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(200).send('User data saved successfully');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
