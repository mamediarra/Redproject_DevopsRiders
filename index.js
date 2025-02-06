const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 8080;

// Connexion à la base de données
const db = mysql.createConnection({
  host: '192.168.64.4', // Adresse du serveur MariaDB
  user: 'auth_user',
  password: 'My_User_Password',
  database: 'auth_app_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connecté à la base de données');
});

// Middleware pour analyser les formulaires
app.use(bodyParser.urlencoded({ extended: true }));

// Servir les fichiers statiques
app.use(express.static('public'));

// Page de connexion
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      res.redirect('/success.html');
    } else {
      res.send('Nom d\'utilisateur ou mot de passe incorrect');
    }
  });
});

app.listen(port, () => {
  console.log(`Application lancée sur le port ${port}`);
});
