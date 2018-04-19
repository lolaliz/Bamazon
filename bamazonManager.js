var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'bamazon_DB'
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log(`connected as ${connection.threadId}`)
    console.log("******** Welcome Bamazon Store Manager **********")
    managerMenu()
  });


  function managerMenu () {
    inquirer
    .prompt({
        name: "initialMenu",
        type:"rawlist",
        message: "What would you like to do today?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    })
    .then(function(answer) { 
        switch (answer.initialMenu){
            case "View Products for Sale":
            viewProducts ()
            break;
            case "View Low Inventory":
            viewLow ()
            break;

        }
      })
  }

  function viewProducts (){
    var managerTable = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
      connection.query('SELECT * FROM products', function(err, results) {
        if (err) throw err;
        if (results.length) {
            for (var i = 0; i < results.length; i++) {
                managerTable.push(
                    [
                        results[i].id,
                        results[i].product_name,
                       'Dept.: ' + results[i].department_name,
                        '$' + results[i].price,
                        'Stock Quantity: ' + results[i].stock_quantity
                    ]
                );
            }
            console.log(managerTable.toString()) } else {
                console.log ("We are out of stock!")
                connection.end()
            }
})
  }

function viewLow (){
    var lowInventory = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
      connection.query('SELECT * FROM products', function(err, results) {
        if (err) throw err;
        if (results.length) {
            for (var i = 0; i < results.length; i++) {
                if (results[i].stock_quantity <= 5) { 
                lowInventory.push(
                    [
                        results[i].id,
                        results[i].product_name,
                       'Dept.: ' + results[i].department_name,
                        '$' + results[i].price,
                        'Stock Quantity: ' + results[i].stock_quantity
                    ]
                );}
            }
            console.log(lowInventory.toString())
             } else {
                console.log ("No low inventory stock!")
                connection.end()
            }
})
}