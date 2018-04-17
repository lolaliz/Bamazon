var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'bamazon_DB'
  });

  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to display the products
    console.log(`connected as ${connection.threadId}`)
    start()
  });

  function start () {
      //var productTable = `SELECT * FROM products`
      connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;
        console.log(results)
      })

      
      connection.end();
  }