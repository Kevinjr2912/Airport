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

exports.searchFlights = (req,res) => {
  const {origin,destination} = req.body;
  console.log("Este es el origen " + origin + " y el destino: " + destination)

  db.query('SELECT fl.price_flight,fl.arrival_date,fl.arrival_time,fl.depature_date,fl.depature_time,orig.airport AS origin_airport, dest.airport AS destination_airport, mun_orig.municipality_name AS name_municipality_origin, mun_dest.municipality_name AS name_municipality_destination FROM flights fl INNER JOIN ubication orig ON fl.origin_id = orig.id_ubication INNER JOIN ubication dest ON fl.destination_id = dest.id_ubication INNER JOIN municipalitys mun_orig ON  mun_orig.id_municipalitys = orig.id_municipalitys INNER JOIN municipalitys mun_dest ON mun_dest.id_municipalitys = dest.id_municipalitys WHERE mun_orig.municipality_name = ? AND mun_dest.municipality_name = ?',[origin,destination],(err,result)=>{
    if(err){
      console.log(err)
      res.status(500).send("Error al buscar dicho vuelo");
    }
    res.json(result);
  })
}