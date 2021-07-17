const { query } = require("express");
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

// For Excercises Week3 keep going below

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
    pool.query( "Select * from products" , (error, result)=>{
        if(result){
            res.send(result.rows) 
        } else {
            res.send(error)
        }
    });
});

// Search products by name
app.get("/products/byName/:name", function(req, res) {
const productName = req.params.name
const query = `select * from products p where p.product_name like '%${productName}%'`
    pool.query( query , (error, result)=>{
        if(result){
            res.send(result.rows) 
        } else {
            res.send(error)
        }
    });
});

// Excercises Week3
// add a new GET endpoint /products to load all the product names along with their supplier names.
app.get("/products/withsuppliername", (req,res)=>{
    const query = "select p.product_name, s.supplier_name from products p inner join suppliers s on s.id = p.id"
    pool.query( query , (error, result)=>{
        if(result){
            res.send(result.rows) 
        } else {
            res.send(error)
        }
    });    
})


// Add a new GET endpoint /customers/:customerId to load a single customer by ID.
app.get("/customers/byID/:id", function(req, res) {
    const customerId = req.params.id
    const query = `select * from customers c where id=${customerId}`

    pool.query( query, (error, result)=>{
        if(result){
            res.send(result.rows) 
        } else {
            res.send(error)
        }
    });
});


// Add a new GET endpoint /customers/:customerId/orders to load all the orders along the items in the orders of a specific customer. Especially, the following information should be returned: order references, order dates, product names, unit prices, suppliers and quantities.

app.get("/customers/:customerId/orders", (req, res) => {
    const customerId = req.params.customerId;
  
    pool
      .query(
        `SELECT c.name, o.order_reference, o.order_date, p.product_name, p.unit_price, s.supplier_name, oi.quantity FROM customers c INNER JOIN orders o ON c.id = o.customer_id INNER JOIN order_items oi ON o.id = oi.order_id INNER JOIN products p ON p.id = oi.product_id INNER JOIN suppliers s ON s.id = p.supplier_id WHERE c.id = ${customerId} `
      )
      .then((result) => res.json(result.rows))
      .catch((error) => console.error(error));
  });


app.listen(3000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});