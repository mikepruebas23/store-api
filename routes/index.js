const express = require('express');

const router = express.Router();

const ordersController = require('../controllers/ordersController');
const customersController = require('../controllers/customersController');
const productsController = require('../controllers/productsController');

module.exports = function(){

    router.post('/orders',              ordersController.add);
    router.get('/orders',               ordersController.list);
    router.get('/orders/:id',           ordersController.show);
    router.put('/orders/:id',           ordersController.update);
    router.delete('/orders/:id',        ordersController.delete);
    router.get('/orders/customer/:id',  ordersController.byCustomer);

    router.post('/customers',       customersController.add); // Add a new Client
    router.get('/customers',        customersController.list); // Show client list
    router.get('/customers/:id',    customersController.show); //Get by id
    router.put('/customers/:id',    customersController.update); //UPDATE
    router.delete('/customers/:id', customersController.delete); //DELETE

    router.post('/products',        productsController.fileUpload, productsController.add); // Add a new Product
    router.get('/products',         productsController.list); // Show client list
    router.get('/products/:id',     productsController.show); //Get by id
    router.put('/products/:id',     productsController.fileUpload,productsController.update); //UPDATE product
    router.delete('/products/:id',  productsController.delete); //DELETE
    router.get('/products/search/:query',  productsController.search); //DELETE

    return router;
};