// Initial setup.

// This "users" Route will take responsibilty regarding all available functions for handling user interface: Registration, login and authentication. 

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mysql = require("mysql");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validateInputOfRegistry = require("../../validation/validateRegistration.js");
const validateLoginInput  = require("../../validation/validateLogin.js");
const cookieParser = require('cookie-parser');
const JwtStrategy = require('passport-jwt').Strategy;
router.use(cookieParser());

//ConnectToDB
const con = mysql.createConnection(
    {
        host: keys.LOCAL_ENDPOINT,
        port: keys.LOCAL_PORT,
        user:  keys.LOCAL_USER,
        password: keys.LOCAL_PASS,
        database: keys.LOCAL_DBNAME
    },
  );
  
// POST request function that will register the user te user to the database.
// It will receive a body object from the client. The body object consists of :
// : Email, 2 passwords, first name and last name.
// First, the object is going through validation using the validateInputOfRegistry.
// If it's valid the function will check if the user is already exists in the database.If it is, we will send a 400 status to the client with the message of the errors object.
//  if no, we will proceed with the registration process.


router.post("/register", (req, res) => {
  const {errors, isValid} = validateInputOfRegistry(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    else {
        let email = req.body.email;
        let password = req.body.password;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let role = 0;
        console.log(email);

        con.query(`SELECT * FROM users WHERE mail = "${email}"`, function(
            err,
            result,
            fields
        ) {
            if (err) throw err;
            if (result.length !== 0) {
                errors.email = "user exists";
                res.json(errors);
            } else {
                //Using BCRYPT to hash the passwords.
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        password = hash;
                        con.query(
                            `INSERT INTO users ( first_name, last_name, mail, password, role) VALUES ("${firstName}","${lastName}","${email}","${password}","${role}")`,
                            function(err, result, fields) {
                                if (err) throw err;
                                response = {result, msg : "user successfully created"};
                                res.json(response);
                            }
                        );
                    });
                });
            }
        });
    }
});

// POST request function that will log-in the user. That means we check if the user is exists in the database. If yes, we will grant him access to specific places in the website.
router.post("/login", (req, res) => {
    
    // validateLoginInput is a method that return an object of errors and isValid proprty. 
    // If errors is empty then isValid will be True. 
    const {errors, isValid} = validateLoginInput(req.body);
    console.log("got-to");
    //Check Validation, if there are errors so return status 400 to the client.
    if (!isValid) {
        return res.status(400).json(errors)
    } else {
        // If everything's fine, we will check in the database if the username exists in the database.....
        const email = req.body.email;
        const password = req.body.password;
        con.query(`SELECT * FROM users WHERE mail = "${email}"`, function (
            err,
            result,
            fields
        ) {
            if (err) throw err;
            
            if (result.length > 0){
                // `Compare Hashed Passwords with Bcrypt.
                bcrypt.compare(password, result[0].password).then(isMatch => {
                    if (isMatch) {
                        // console.log("isMatch");
                        const payload = {id: result[0].id, name: result[0].first_name, role: result[0].role};
                        // With JSON webtoken we sign the user in with a cookie that will be expired in 1 hour.
                        jwt.sign(payload, 'secret', {expiresIn: 3600}, (err, token) => {
                            // console.log(token);
                            //we send the cookie with a hashed token.
                            res.cookie('jwt', token);
                            res.json({success: true, token: token})
                        });
                    } else {
                        errors.password ="Password Incorrect";
                        res.status(400).json(errors);
                    }
                });
        } else {
                errors.email = "User Not Found";
                res.status(400).json(errors);
            }
        })
    }
});

// This get method will check whose are logged in. it returns the name, mail and the role of the user.
// For more info please refer to "../../config/passportcookie.js" file.
router.get('/current', passport.authenticate('jwt', {session : false}), (req, res) => {
    
    res.json({id: req.user[0].id, name: req.user[0].first_name, mail: req.user[0].mail, role:req.user[0].role})
    console.log("passed")

});

module.exports = router;
