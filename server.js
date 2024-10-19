// importing the necessary dependencies
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

   const app = express();
   dotenv.config();


   //create a connection object
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

   //test the connection
   console.log(process.env.DB_USERNAME);
   
   app.get('/',(req,res) => {
    res.send("Hello,world");
   });

   
   // Question 1 goes here
   app.get('/patients', (req,res) => {
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';

  db.query(sql, (err,results) =>{
    if(err) {
      return res.status(500).send(err);
    }
    res.json(results);
  })
})

   // Question 2 goes here
   app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    
    db.query(sql, (err,results) =>{
      if(err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });


   // Question 3 goes here
app.get('/patients/:first_name', (req, res) => {
  const first_Name = req.params.first_name;
  const query = 'SELECT * FROM patients WHERE first_name = ?';
  
  db.query(sql, (err,results) =>{
    if(err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

   // Question 4 goes here
   app.get('/providers_specialty', (req,res) => { //provider specialty = endpoint
    const specialty = req.query.specialty;//req and res = endpoint
    const sql = "SELECT first_name, last_name, provider_specialty FROM proiders WHERE provider_specialty = ?";  //?used for security to prevent sql injection
    
    db.query(sql, [specialty], (err,results) =>{
      if(err) {// if true
        return res.status(500).send(err);//500 = internal server error
      }
      results = JSON.results; //pass results in json format
      res.send(results);
    });
  });



   
//declare the port and listen to the server
const PORT = 3301;
app.listen(PORT, () => {
 console.log('Server is running on http://lococalhost:${PORT}')
})


