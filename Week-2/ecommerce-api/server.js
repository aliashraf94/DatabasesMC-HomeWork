const express = require("express");
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'migracode',
    port: 5432
});

app.get("/hello", function(req, res) {
   res.send("hello World")
});

// Retrieve all the Customers
app.get("/customers", function(req, res) {
    pool.query("select * from customers", (error, result)=>{
        if(result){
            res.send(result.rows) 
        } else {
            res.send(error)
        }
    });
});

// Retrieve all the Suppliers
app.get("/suppliers", function(req, res) {
    pool.query("select * from suppliers", (error, result)=>{
        if(result){
            res.send(result.rows) 
        } else {
            res.send(error)
        }
    });
});

// Retrieve all the product names along with their supplier names.
app.get("/products", function(req, res) {
    pool.query(" select p.product_name, s.supplier_name from products p inner join suppliers s on s.id = p.supplier_id", (error, result)=>{
        if(result){
            res.send(result.rows) 
        } else {
            res.send(error)
        }
    });
});



app.listen(3000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});