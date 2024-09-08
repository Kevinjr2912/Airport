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
  console.log("Conexión al modulo reservations establecida");
});

exports.cancelReservations = [(req, res) => {
    const idReservation = req.params.id;

    db.query('UPDATE reservations SET id_reservation_status = 3 WHERE id_reservation = ?', idReservation, (err, result) => {
        if(err){
            res.status(500).json({error: "Error al cancelar reservación"});
        }
        res.status(201).json({message: "Reserva cancelada"})
    });
}];