DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
    id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100),
    price DECIMAL(10,2),
    stock_quantity INTEGER default 1,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pet Gate", "Pet Products", 33.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pet Carrier", "Pet Products", 55.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mover Toy", "Pet Products", 14.50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Training Guide", "Pet Products", 17.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cat Care Guide", "Pet Products", 12.89, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("4 Person Tent", "Outdoor Recreation", 58.79, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lightweight Sleeping Bag", "Outdoor Recreation", 38.68, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Camping Stove", "Outdoor Recreation", 29.79, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mini Water Filtration System", "Outdoor Recreation", 15.88, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Swiss Army Knife", "Outdoor Recreation", 18.69, 10);