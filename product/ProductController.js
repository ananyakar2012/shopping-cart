const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const LocalStorage = require('node-localstorage').LocalStorage;
const config = require('../config.js');
const jwt = require('jsonwebtoken');
localStorage = new LocalStorage('./scratch');

var app = express()
app.use(express.static('../public'));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const Product = require('./Product');
const User = require('../user/User');

// GETS all product FROM THE DATABASE
    router.get('/dashboard', function (req, res) {
        var token = localStorage.getItem('authtoken')
        console.log("token>>>",token)
        if (!token) {
            res.redirect('/')
        }
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                res.redirect('/')
            };
            User.findById(decoded.id, { password: 0 }, function (err, user) {
                if (err) {res.redirect('/')}
                if (!user) {res.redirect('/')}
                //res.render('profile.ejs',{user})
                Product.find({}, function (err, product) {
                    if (err) {res.redirect('/')}
                    if (!product) {res.redirect('/')}
                    res.render('dashboard.ejs',{product, user})
                });
            });
            
        });
    });

    router.get('/shopping-list', function (req, res) {
        var token = localStorage.getItem('authtoken')
        console.log("token>>>",token)
        if (!token) {
            res.redirect('/')
        }
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                res.redirect('/')
            };
            User.findById(decoded.id, { password: 0 }, function (err, user) {
                if (err) {res.redirect('/')}
                if (!user) {res.redirect('/')}
                
                //res.render('profile.ejs',{user})
                Product.find({}, function (err, product) {
                    if (err) {res.redirect('/')}
                    if (!product) {res.redirect('/')}
                    console.log(product)
                    res.render('shoppinglist.ejs',{product, user})
                });
            });
            
        });
    });

    router.post('/add-product', function (req, res) {
        var token = localStorage.getItem('authtoken')
        console.log("token>>>",token)
        if (!token) {
            res.redirect('/')
        }
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                res.redirect('/')
            };
            
            Product.create(req.body, (err, result) => {
                if (err) {
                    res.redirect('/')
                } else {
                    res.redirect('shopping-list')
                }
            })
            
        });
    });
    router.get('/product', function (req, res) {
        var token = localStorage.getItem('authtoken')
        console.log("token>>>",token)
        if (!token) {
            res.redirect('/')
        }
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                res.redirect('/')
            };
            res.render('addproduct.ejs')
            
        });
    });

router.get('/signup',  (req, res) => {
    res.render('signup.ejs')
 });

 router.get('/logout', (req,res) => {
     localStorage.removeItem('authtoken');
     res.redirect('/');
 })

module.exports = router;