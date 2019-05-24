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
});

function start() {
    inquirer
        .prompt([
            {
                name: "selectAction",
                type: "list",
                message: "What would you like to do?",
                choices: ["View Product Sales by Department", "Create New Department", "EXIT"]
            }
        ])
        .then(function (answers) {
            if (answers.selectAction === "View Product Sales by Department") {
                viewProductSalesDepartment();
            }
            else if (answers.selectAction === "Create New Department") {
                createNewDepartment();
            }
            else {
                connection.end();
            }
        });
}
function viewProductSalesDepartment(){
    console.log("viewProductSalesDepartment");
    connection.end();
}

function createNewDepartment(){
    console.log("create new department");
    connection.end();
}