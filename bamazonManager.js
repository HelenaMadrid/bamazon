var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log("You are connected");
    start();
    //connection.end();
});

function start() {
    inquirer
        .prompt([
            {
                name: "selectAction",
                type: "list",
                message: "What would you like to do?",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]
            }
        ])
        .then(function(answers){
            if(answers.selectAction=== "View Products for Sale"){
                viewProducts();
            }
            else if(answers.selectAction==="View Low Inventory"){
                viewLowInventory();
            }
            else if(answers.selectAction==="Add to Inventory"){
                addInventory();
            }
            else if(answers.selectAction==="Add New Product"){
                addNewProduct();
            }
            else{
                connection.end();
            }
        });
}
function viewProducts(){
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        //console.log(results);
        for (var x = 0; x < results.length; x++) {
            console.log(results[x].item_id + " | " + results[x].product_name + " | " + results[x].department_name + " | " + results[x].price + " | " + results[x].stock_quantity);
        }
        start();
    })
}

function viewLowInventory(){

}

function addInventory(){

}
function addNewProduct(){
    
}