DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL (10,2) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price,stock_quantity)
VALUES ("Herbal Essences", "Personal Care", 87.50, 35), ("Colgate", "Personal Care", 41.70, 46),
("Flashlight keychain", "Outdoor Recreation", 32.46, 23), ("Hand warmers", "Outdoor Recreation", 18.98, 33),
("Silver earrings", "Jewelry", 173.40, 9), ("Long sleeve jacket", "Clothing", 450.22, 15), ("Montana Necklace", "Jewelry", 76.50, 16),
("Plastic cups", "Home", 21.30, 42), ("Apple wax melt", "Home", 32.20, 47), ("Lipstick", "Personal Care", 12.50, 30);