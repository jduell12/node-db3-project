-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT p.productName, c.categoryName 
FROM Product as p
JOIN Category as c 
ON p.CategoryId = c.Id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT o.id, o.shipName as Shipper_Company_Name
FROM Orders as o
WHERE o.orderDate < '2012-08-09'
ORDER BY o.OrderDate desc;

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

SELECT p.productname as Name, p.quantityPerUnit as Quantity
FROM Product as p
JOIN OrderDetail as o
WHERE o.OrderId = 10251 AND o.productId = p.id
ORDER BY p.ProductName;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

SELECT o.id, c.CompanyName as Customer_Company_Name, e.LastName as Employee_Last_Name
FROM Orders as o
JOIN Customer as c, Employee as e
WHERE o.customerid = c.Id AND o.employeeId = e.id;