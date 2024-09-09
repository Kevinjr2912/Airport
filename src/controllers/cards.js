require("dotenv").config();

//Cargar las variables de entorno
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("conection to module cards enabled");
});

//holder

exports.addHolder = (req, res) => {
    const { firstName, middleName, firstSurname, secondSurname } = req.body;
  
    const insertHolder = `
      INSERT INTO holders (first_name, middle_name, first_surnsme, second_surname)
      VALUES (?, ?, ?, ?)`;
  
    db.query(insertHolder, [firstName, middleName, firstSurname, secondSurname], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error trying to add the holder" });
      }
  
      res.status(201).json({ message: "Holder added successfully", holderId: result.insertId });
    });
  };

//add
exports.addCard = (req, res) => {
    const { card_number, due_date, bank, id_holder, id_user } = req.body;

    const query = 'INSERT INTO cards (card_number, due_date, bank, id_holder, id_user) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [card_number, due_date, bank, id_holder, id_user], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error trying to add the card" });
      }
      res.status(201).json({ message: 'Card added successfully'});
    });
  };    

//search
exports.searchCard = (req, res) => {
    const id = req.params.id;

    const query = 'SELECT * FROM cards WHERE id_card = ?';
    db.query(query, id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error trying to search the card"});
      }
      res.status(201).json({ message: 'Find it'});
    });
  };

//update
exports.updateCard = (req, res) => {
    const id = req.params.id;
    const { card_number, due_date, bank, id_holder, id_user } = req.body;

    const query = 'UPDATE cards SET card_number = ?, due_date = ?, bank = ?, id_holder = ?, id_user = ? WHERE id_card = ?';
    db.query(query, [card_number, due_date, bank, id_holder, id_user, id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error trying to update the card" });
      }
      res.status(200).json({ message: 'Card updated successfully' });
    });
  };

//delete
exports.deleteCard = (req, res) => {
    const id = req.params.id;

    const query = 'DELETE FROM cards WHERE id_card = ?';
    db.query(query,id, (err, result) => {
      if (err) {
        return res.status(500).json({ error:"Error trying to delete the card" });
      }
      res.status(200).json({ message: 'Card deleted successfully' });
    });
  };
