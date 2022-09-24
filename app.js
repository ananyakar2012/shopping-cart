const express = require('express');
const app = express();
const db = require('./db');

const UserController = require('./user/UserController');
const ProductController = require('./product/ProductController');
app.use('/users', UserController);
app.use('/products', ProductController);

const AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;