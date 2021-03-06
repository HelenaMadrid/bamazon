var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table3');

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
        .then(function (answers) {
            if (answers.selectAction === "View Products for Sale") {
                viewProducts();
            }
            else if (answers.selectAction === "View Low Inventory") {
                viewLowInventory();
            }
            else if (answers.selectAction === "Add to Inventory") {
                addInventory();
            }
            else if (answers.selectAction === "Add New Product") {
                addNewProduct2();
            }
            else {
                connection.end();
            }
        });
}
function viewProducts() {
    connection.query("SELECT item_id,product_name, department_name, price, stock_quantity, product_sales FROM products INNER JOIN departments ON products.department_id=departments.department_id", function (err, results) {
        if (err) throw err;
        var table = new Table({
            head: ["ID", "Product", "Department", "Price", "Stock", "P.Sales"]
            , colWidths: [5, 25, 20, 10, 10, 10]
        });

        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        for (var x = 0; x < results.length; x++) {

            table.push(
                [results[x].item_id, results[x].product_name, results[x].department_name, results[x].price, results[x].stock_quantity, results[x].product_sales]
            );
        }
        console.log(table.toString());
        start();
    })
}

function viewLowInventory() {
    connection.query("SELECT item_id,product_name, department_name, price, stock_quantity, product_sales FROM products INNER JOIN departments ON products.department_id=departments.department_id WHERE stock_quantity < 5", function (err, results) {
        if (err) throw err;
        var table = new Table({
            head: ["ID", "Product", "Department", "Price", "Stock", "P.Sales"]
            , colWidths: [5, 25, 20, 10, 10, 10]
        });

        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        for (var x = 0; x < results.length; x++) {

            table.push(
                [results[x].item_id, results[x].product_name, results[x].department_name, results[x].price, results[x].stock_quantity, results[x].product_sales]
            );
        }
        console.log(table.toString());
        start();
    })
}
function addNewProduct() {
    inquirer
        .prompt([
            {
                name: "productName",
                type: "input",
                message: "What is the name of the product?"
            },
            {
                name: "departmentName",
                type: "input",
                message: "What department does this product belong to?"
            },
            {
                name: "unitPrice",
                type: "input",
                message: "What is the unit price of the product?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "stock",
                type: "input",
                message: "How much of this product do you have?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answers) {
            connection.query("INSERT INTO products SET ?", {
                product_name: answers.productName,
                department_name: answers.departmentName,
                price: answers.unitPrice,
                stock_quantity: answers.stock

            },
                function (err) {
                    if (err) throw err;
                    console.log("Your product was created successfully!");
                    // re-prompt the user for if they want to bid or post
                    start();
                }
            )
        });

}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        var newInventory;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var y = 0; y < results.length; y++) {
                            choiceArray.push(results[y].product_name);
                        }
                        return choiceArray;
                    },
                    message: "On what product would you like to add inventory?"
                },
                {
                    name: "addInventory",
                    type: "input",
                    message: "How much inventory would you like to add?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }
                newInventory = chosenItem.stock_quantity + parseInt(answer.addInventory);
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newInventory
                        },
                        {
                            product_name: chosenItem.product_name
                        }
                    ],
                    function (error) {
                        if (error) throw err;
                        console.log("Stock Updated successfully!");
                        start();
                    }
                );
            })
    }
    )
}
function addNewProduct2() {
    connection.query("SELECT * FROM departments", function (err, results) {
        if (err) throw err;
        var departmentId;
        inquirer
            .prompt([
                {
                    name: "productName",
                    type: "input",
                    message: "What is the name of the product?"
                },
                {
                    name: "departmentName",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var y = 0; y < results.length; y++) {
                            choiceArray.push(results[y].department_name);
                        }
                        return choiceArray;
                    },
                    message: "What department does this product belong to?"
                },
                {
                    name: "unitPrice",
                    type: "input",
                    message: "What is the unit price of the product?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    name: "stock",
                    type: "input",
                    message: "How much of this product do you have?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answers) {
                var choice;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].department_name === answers.departmentName) {
                        choice = results[i];
                    }
                }
                console.log(choice.department_id);
                connection.query("INSERT INTO products SET ?", {
                    product_name: answers.productName,
                    department_id: choice.department_id,
                    price: answers.unitPrice,
                    stock_quantity: answers.stock

                },
                    function (err) {
                        if (err) throw err;
                        console.log("Your product was created successfully!");
                        // re-prompt the user for if they want to bid or post
                        start();
                    }
                )
            });
    })
}